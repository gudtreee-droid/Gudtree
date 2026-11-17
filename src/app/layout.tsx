import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import './gudtree.css';
import NavigationProgress from '@/components/gudtree/NavigationProgress';
import FloatingNavbar from '@/components/gudtree/FloatingNavbar';
import GudTreeFooter from '@/components/gudtree/GudTreeFooter';
import Analytics from '@/components/Analytics';
import MainWrapper from '@/components/MainWrapper';
import FaviconManager from '@/components/FaviconManager';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gudtree.in'
  ),
  title: {
    default: 'GudTree | Clean Eating, Healthy Snacking & Nutrition for India',
    template: '%s | GudTree',
  },
  description:
    'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and health-first wellness guides.',
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
  authors: [{ name: 'GudTree Editorial Team', url: 'https://www.gudtree.in' }],
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
      'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and health-first wellness guides.',
    url: 'https://www.gudtree.in',
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
      'GudTree is India’s premier clean snacking and nutrition publication, delivering honest packed food audits, desi diet frameworks, and health-first wellness guides.',
    site: '@gudtree',
    creator: '@gudtree',
    images: ['/icon.png'],
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      't9na2oTjNEA-Mnwuiyo_dsyflp-do8ND3iAhF4KAMVY',
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
  '@id': 'https://www.gudtree.in/#organization',
  name: 'GudTree',
  url: 'https://www.gudtree.in/',
  logo: 'https://www.gudtree.in/icon.png',
  description:
    'GudTree is India’s premier healthy eating and snacking publication, delivering honest nutrition guides, clean snacking reviews, and health-first diet frameworks.',
  sameAs: [
    'https://twitter.com/gudtree',
    'https://www.instagram.com/gudtree',
    'https://www.linkedin.com/company/gudtree',
    'https://www.youtube.com/@gudtree',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.gudtree.in/#website',
  url: 'https://www.gudtree.in/',
  name: 'GudTree',
  description: 'Clean Eating, Healthy Snacking & Nutrition for India.',
  publisher: {
    '@id': 'https://www.gudtree.in/#organization',
  },
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.gudtree.in/category?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
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
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Lilita+One&display=swap"
          rel="stylesheet"
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHHRH6MQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
