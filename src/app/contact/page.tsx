import React from 'react';
import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Contact Nutrition & Editorial Desk | GudTree',
  description:
    'Connect with GudTree editors, pitch clean-label snack reviews, patient nutrition guides, or reach our healthy living editorial desk.',
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: 'Contact Editorial Desk | GudTree',
    description:
      'Connect with GudTree editors, submit clean snacking pitches, nutrition stories, or reach our editorial desk.',
    url: `${baseUrl}/contact`,
    siteName: 'GudTree',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Editorial Desk | GudTree',
    description:
      'Connect with GudTree editors, submit clean snacking pitches, nutrition stories, or reach our editorial desk.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${baseUrl}/contact#webpage`,
      url: `${baseUrl}/contact`,
      name: 'Contact GudTree Editorial Desk',
      description:
        'Connect with GudTree editors, submit clean snacking pitches, nutrition articles, or reach our healthy living editorial desks.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'GudTree',
        url: baseUrl,
      },
      mainEntity: {
        '@type': 'NewsMediaOrganization',
        '@id': `${baseUrl}/#organization`,
        name: 'GudTree',
        url: baseUrl,
        email: 'contact@gudtree.in',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/contact#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${baseUrl}/contact` },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
