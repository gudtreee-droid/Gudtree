import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  Lilita_One,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import './gudtree.css';
import NavigationProgress from '@/components/gudtree/NavigationProgress';
import FloatingNavbar from '@/components/gudtree/FloatingNavbar';
import GudTreeFooter from '@/components/gudtree/GudTreeFooter';
import Analytics from '@/components/Analytics';
import MainWrapper from '@/components/MainWrapper';
import FaviconManager from '@/components/FaviconManager';

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'GudTree | Clean Eating, Healthy Snacking & Nutrition for India',
    template: '%s | GudTree',
  },
  description:
    'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and patient-safe wellness guides.',
  keywords: [
    'GudTree',
    'Healthy Snacking',
    'Clean Eating',
    'Diet and Nutrition India',
    'Healthy Indian Snacks',
    'Makhana Snacks',
    'Jaggery Gud Snacks',
    'Diabetic Friendly Indian Snacks',
    'PCOS Clean Diet',
    'Weight Loss Snacks India',
    'Zero Palm Oil Snacks',
  ],
  authors: [{ name: 'GudTree Editorial Team', url: 'http://localhost:3000' }],
  creator: 'GudTree',
  publisher: 'GudTree',
  applicationName: 'GudTree',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'GudTree | Clean Eating, Healthy Snacking & Nutrition for India',
    description:
      'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and patient-safe wellness guides.',
    url: 'http://localhost:3000',
    siteName: 'GudTree',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'GudTree | Clean Eating, Healthy Snacking & Nutrition for India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GudTree | Clean Eating, Healthy Snacking & Nutrition for India',
    description:
      'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and patient-safe wellness guides.',
    site: '@gudtree',
    creator: '@gudtree',
    images: ['/icon.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'http://localhost:3000/#organization',
  name: 'GudTree',
  url: 'http://localhost:3000/',
  logo: 'http://localhost:3000/images/gudtree-logo.png',
  description:
    'GudTree is India’s premier healthy eating and snacking publication, delivering honest nutrition guides, clean snacking reviews, and patient-safe diet frameworks.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'http://localhost:3000/#website',
  url: 'http://localhost:3000/',
  name: 'GudTree',
  description: 'Clean Eating, Healthy Snacking & Nutrition for India.',
  publisher: {
    '@id': 'http://localhost:3000/#organization',
  },
  inLanguage: 'en-IN',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lilitaOne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col gt-font-sans bg-[#FFF9EC] text-[#102A56]"
      >
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <FloatingNavbar />
        <MainWrapper>{children}</MainWrapper>
        <GudTreeFooter />
        <Analytics />
        <FaviconManager />
      </body>
    </html>
  );
}
