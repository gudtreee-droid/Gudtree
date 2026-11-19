import { NextResponse } from 'next/server';
import {
  getClientIp,
  checkRateLimit,
  recordLoginAttempt,
  generateAdminToken,
  verifyAdminCredentials,
  verifyAdminAuth,
  ADMIN_COOKIE_NAME,
} from '@/lib/adminAuth';
import {
  verifyAdminPasswordInDB,
  saveAdminPasswordInDB,
} from '@/lib/supabaseService';

export const dynamic = 'force-dynamic';

// --- GET: Verify Active Admin Session ---
export async function GET(request: Request) {
  const auth = verifyAdminAuth(request);
  if (auth.authenticated) {
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: auth.user,
    });
  }
  return NextResponse.json(
    {
      success: false,
      authenticated: false,
      error: auth.error || 'Not authenticated',
    },
    { status: 401 }
  );
}

// --- POST: Secure Login or Change Password ---
export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  try {
    const body = await request.json();
    const { action, username, password, currentPassword, newPassword } = body;

    // Action 1: Verify / Login
    if (action === 'login' || action === 'verify' || !action) {
      // 1. Check Rate Limiting
      const rateLimit = checkRateLimit(clientIp);
      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: `Too many failed attempts. Workstation locked for security. Try again in ${rateLimit.remainingSeconds} seconds.`,
          },
          { status: 429 }
        );
      }

      const targetUser = username || 'admin';
      const targetPassword = password || currentPassword;

      if (!targetPassword) {
        return NextResponse.json(
          { success: false, error: 'Password is required.' },
          { status: 400 }
        );
      }

      // 2. Cryptographic Constant-Time Verification
      const verifyResult = await verifyAdminCredentials(targetUser, targetPassword);

      if (!verifyResult.success) {
        recordLoginAttempt(clientIp, false);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid username or password. Access denied.',
          },
          { status: 401 }
        );
      }

      // 3. Login Succeeded - Reset rate limiter
      recordLoginAttempt(clientIp, true);

      // 4. Issue Cryptographically Signed Session Token
      const token = generateAdminToken(targetUser);

      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful. Workspace unlocked.',
        token,
        user: {
          username: targetUser,
          role: 'admin',
        },
      });

      // 5. Set HttpOnly, SameSite=Strict secure cookie
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    // Action 2: Change Admin Password (Requires Active Session)
    if (action === 'change_password') {
      const auth = verifyAdminAuth(request);
      if (!auth.authenticated) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Active admin session required.' },
          { status: 401 }
        );
      }

      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: 'Current password is required.' },
          { status: 400 }
        );
      }

      const isCurrentValid = await verifyAdminCredentials(auth.user || 'admin', currentPassword);
      if (!isCurrentValid.success) {
        return NextResponse.json(
          { success: false, error: 'Current password is incorrect.' },
          { status: 401 }
        );
      }

      if (!newPassword || newPassword.trim().length < 8) {
        return NextResponse.json(
          {
            success: false,
            error: 'New password must be at least 8 characters long.',
          },
          { status: 400 }
        );
      }

      const updateResult = await saveAdminPasswordInDB(newPassword.trim());
      if (updateResult.success) {
        return NextResponse.json({
          success: true,
          message: 'Admin password updated in database successfully!',
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: updateResult.error || 'Failed to update admin password in database.',
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action specified' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Admin auth route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}

// --- DELETE: Secure Logout (Clears Session Cookie) ---
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Signed out successfully.',
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
