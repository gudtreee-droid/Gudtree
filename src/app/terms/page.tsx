import React from 'react';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import EditorialTitle from '@/components/gudtree/EditorialTitle';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Terms of Service | GudTree',
  description:
    'Read the Terms of Service governing nutrition guides, snack audits, content rights, and readership across GudTree.',
  alternates: { canonical: `${baseUrl}/terms` },
  openGraph: {
    title: 'Terms of Service | GudTree',
    description:
      'Terms of Service for GudTree nutrition dispatches, clean snacking guides, and digital properties.',
    url: `${baseUrl}/terms`,
    siteName: 'GudTree',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = 'November 2026';

  return (
    <div className="nf-container max-w-4xl py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service', href: '/terms' },
        ]}
        showBackLink
        backHref="/"
        backLabel="Front Page"
        rightBadge="Editorial Terms"
      />

      <header className="mb-10 pb-6 border-b border-[#ADC3DE]/60 flex flex-col items-start gap-3">
        <span className="gt-badge-olive">Editorial Terms</span>
        <EditorialTitle
          as="h1"
          title="GudTree Terms of Service"
          variant="hero"
          className="text-[#102A56]"
        />
        <p className="text-[13px] text-[#666666] gt-font-sans">
          Effective Date: <span className="font-semibold text-[#102A56]">{lastUpdated}</span>
        </p>
      </header>

      <div className="gt-article-body space-y-8">
        <section>
          <h2>01. Acceptance of Terms</h2>
          <p>
            By accessing or reading publications distributed through GudTree, you agree to observe these Terms of Service and applicable intellectual property laws.
          </p>
        </section>

        <section>
          <h2>02. Editorial Copyright &amp; Fair Quotation</h2>
          <p>
            All articles, guides, imagery, and editorial design assets published on GudTree remain the property of their respective authors and GudTree. Excerpts quoted for commentary or educational sharing must clearly attribute GudTree and link to the source dispatch.
          </p>
        </section>

        <section>
          <h2>03. Informational Purpose &amp; Health Disclaimer</h2>
          <div className="p-5 rounded-[20px] bg-[#D6EDFF]/55 border border-[#ADC3DE] text-[14px] text-[#102A56]">
            <strong>Notice:</strong> Coverage across diet, snacking, nutrition, and wellness is published solely for educational and informational purposes. Nothing on GudTree constitutes personalized medical, dietary, or healthcare diagnosis or prescription.
          </div>
        </section>

        <section>
          <h2>04. Contributor &amp; Reader Submissions</h2>
          <p>
            Story pitches, clean food reviews, and dietary tips sent to our newsroom are reviewed at editorial discretion and subject to verification for factual accuracy.
          </p>
        </section>

        <section className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65 border-l-4 border-l-[#DA440D]">
          <h3 className="flex items-center gap-2 sc-display-sm text-[19px] text-[#102A56] !mt-0">
            <Mail className="w-4 h-4 text-[#DA440D]" />
            <span>Syndication &amp; Rights Inquiries</span>
          </h3>
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
