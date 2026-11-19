import crypto from 'crypto';
import { getAdminPasswordFromDB } from './supabaseService';

// Fallback configuration if not provided in environment
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'GudTree@Secured2026!';
const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  '9126933069cfcc8fa80e7fd9cf18f5ec0cc020dfd94373d1a49a28ebdfb59c84';

export const ADMIN_COOKIE_NAME = 'gt_admin_session';

// --- RATE LIMITING (In-Memory IP Protection) ---
interface RateLimitRecord {
  failures: number;
  lockedUntil: number;
  lastAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();
  return '127.0.0.1';
}

export function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) return { allowed: true };

  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // If lockout expired, reset
  if (now - record.lastAttempt > LOCKOUT_MS) {
    rateLimitMap.delete(ip);
  }

  return { allowed: true };
}

export function recordLoginAttempt(ip: string, success: boolean): void {
  const now = Date.now();
  if (success) {
    rateLimitMap.delete(ip);
    return;
  }

  const record = rateLimitMap.get(ip) || { failures: 0, lockedUntil: 0, lastAttempt: now };
  record.failures += 1;
  record.lastAttempt = now;

  if (record.failures >= MAX_FAILURES) {
    record.lockedUntil = now + LOCKOUT_MS;
  }

  rateLimitMap.set(ip, record);
}

// --- SECURE CRYPTOGRAPHIC TOKEN (HMAC-SHA256) ---
export interface AdminTokenPayload {
  u: string;
  r: 'admin';
  exp: number;
}

export function generateAdminToken(username: string): string {
  const payload: AdminTokenPayload = {
    u: username,
    r: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string): { valid: boolean; payload?: AdminTokenPayload } {
  if (!token || typeof token !== 'string') return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payloadB64, providedSig] = parts;

  // Recreate expected signature
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadB64)
    .digest('base64url');

  try {
    // Constant-time comparison to prevent timing attacks
    const bufProvided = Buffer.from(providedSig);
    const bufExpected = Buffer.from(expectedSig);
    if (bufProvided.length !== bufExpected.length) return { valid: false };
    if (!crypto.timingSafeEqual(bufProvided, bufExpected)) return { valid: false };

    const payload: AdminTokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );

    // Check expiration
    if (Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// --- CONSTANT TIME PASSWORD CHECK ---
function safeCompareStrings(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
      // Dummy compare to avoid short-circuit timing leak
      crypto.timingSafeEqual(bufA, bufA);
      return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function verifyAdminCredentials(
  user: string,
  pass: string
): Promise<{ success: boolean; error?: string }> {
  if (!user || !pass) {
    return { success: false, error: 'Username and password are required' };
  }

  const cleanUser = user.trim().toLowerCase();
  const cleanPass = pass.trim();

  // Allowed admin usernames
  const allowedUsers = new Set([
    DEFAULT_USERNAME.toLowerCase(),
    'contact@gudtree.in',
    'gudtree',
    'superadmin',
  ]);

  if (!allowedUsers.has(cleanUser)) {
    return { success: false, error: 'Invalid credentials' };
  }

  // 1. Check against Environment Variable password
  if (safeCompareStrings(cleanPass, DEFAULT_PASSWORD)) {
    return { success: true };
  }

  // 2. Check against Supabase Database password (if customized via settings)
  try {
    const dbPassword = await getAdminPasswordFromDB();
    if (dbPassword && safeCompareStrings(cleanPass, dbPassword)) {
      return { success: true };
    }
  } catch {
    // ignore db lookup failure
  }

  return { success: false, error: 'Invalid credentials' };
}

// --- EXTRACT TOKEN FROM REQUEST COOKIE OR HEADER ---
export function extractTokenFromRequest(request: Request): string | null {
  // 1. Check Cookie header
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  for (const c of cookies) {
    if (c.startsWith(`${ADMIN_COOKIE_NAME}=`)) {
      return c.substring(ADMIN_COOKIE_NAME.length + 1);
    }
  }

  // 2. Check Authorization Bearer header
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  return null;
}

export function verifyAdminAuth(request: Request): {
  authenticated: boolean;
  user?: string;
  error?: string;
} {
  const token = extractTokenFromRequest(request);
  if (!token) {
    return { authenticated: false, error: 'Missing authentication token' };
  }

  const result = verifyAdminToken(token);
  if (!result.valid || !result.payload) {
    return { authenticated: false, error: 'Invalid or expired session token' };
  }

  return { authenticated: true, user: result.payload.u };
}
