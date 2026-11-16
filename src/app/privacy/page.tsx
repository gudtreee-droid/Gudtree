import React from 'react';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import EditorialTitle from '@/components/gudtree/EditorialTitle';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Privacy Policy | GudTree',
  description:
    'Learn how GudTree collects, protects, and handles reader data with transparent health & nutrition editorial privacy standards.',
  alternates: { canonical: `${baseUrl}/privacy` },
  openGraph: {
    title: 'Privacy Policy | GudTree',
    description:
      'Learn how GudTree protects reader privacy and data governance.',
    url: `${baseUrl}/privacy`,
    siteName: 'GudTree',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 2026';

  return (
    <div className="nf-container max-w-4xl py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy', href: '/privacy' },
        ]}
        showBackLink
        backHref="/"
        backLabel="Front Page"
        rightBadge="Governance"
      />

      <header className="mb-10 pb-6 border-b border-[#ADC3DE]/60 flex flex-col items-start gap-3">
        <span className="gt-badge-olive">Legal &amp; Privacy</span>
        <EditorialTitle
          as="h1"
          title="GudTree Privacy Policy"
          variant="hero"
          className="text-[#102A56]"
        />
        <p className="text-[13px] text-[#666666] gt-font-sans">
          Effective Date: <span className="font-semibold text-[#102A56]">{lastUpdated}</span>
        </p>
      </header>

      <div className="gt-article-body space-y-8">
        <section>
          <h2>01. Commitment to Reader Privacy</h2>
          <p>
            GudTree (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an independent clean eating and nutrition publication committed to privacy-first digital health journalism. This policy describes how information is handled when you visit our website or interact with our editorial dispatches.
          </p>
        </section>

        <section>
          <h2>02. Information We Collect</h2>
          <p>
            We collect minimal information necessary to maintain reliable publishing operations:
          </p>
          <ul className="list-disc">
            <li>
              <strong>Directly Provided Information:</strong> Email addresses or pitch submissions you voluntarily enter in contact forms or newsletter sign-up boxes.
            </li>
            <li>
              <strong>Aggregated Readership Analytics:</strong> Non-personally identifiable metrics such as story views and technical browser compatibility signals.
            </li>
            <li>
              <strong>Zero Sensitive Financial Capture:</strong> GudTree does not solicit sensitive payment or government identity documents from general readers.
            </li>
          </ul>
        </section>

        <section>
          <h2>03. Zero Sale of Personal Records</h2>
          <p>
            <strong>GudTree will never sell, rent, or trade reader contact details or subscriber lists to commercial brokers or third-party ad networks.</strong>
          </p>
        </section>

        <section>
          <h2>04. Reader Rights &amp; Data Sovereignty</h2>
          <p>
            Readers in all jurisdictions may request access, correction, or deletion of any voluntarily submitted contact records at any time.
          </p>
        </section>

        <section className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65 border-l-4 border-l-[#DA440D]">
          <h3 className="flex items-center gap-2 sc-display-sm text-[19px] text-[#102A56] !mt-0">
            <Mail className="w-4 h-4 text-[#DA440D]" />
            <span>Data Governance Contact</span>
          </h3>
          <p className="!mb-2 text-[14px] text-[#666666]">
            For privacy questions or data requests, contact our editorial governance desk:
          </p>
          <p className="!mb-0 text-[13px] font-medium text-[#102A56]">
            Email:{' '}
            <a href="mailto:contact@gudtree.in" className="text-[#DA440D] hover:underline">
              contact@gudtree.in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
