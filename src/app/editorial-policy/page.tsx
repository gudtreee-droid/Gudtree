import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, FileSearch, Award, Scale, BookOpen, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import EditorialTitle from '@/components/gudtree/EditorialTitle';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Editorial Policy, Audit Methodology & Nutrition Review Board | GudTree',
  description:
    'How GudTree audits Indian packaged food labels, verifies clinical nutrition facts with doctors and dietitians, and maintains 100% zero-sponsorship independence.',
  alternates: { canonical: `${baseUrl}/editorial-policy` },
  openGraph: {
    title: 'Editorial Policy & Nutrition Review Board | GudTree',
    description:
      'Transparent food label audit methodology, ICMR-NIN & FSSAI citation standards, and medical review board credentials at GudTree.',
    url: `${baseUrl}/editorial-policy`,
    siteName: 'GudTree',
    type: 'website',
  },
};

const REVIEW_BOARD = [
  {
    name: 'Dr. Radhika Sen, MBBS, DNB',
    role: 'Clinical Nutrition & Metabolic Health Reviewer',
    focus: 'PCOS insulin resistance, post-prandial glucose response, and hormonal nutrition.',
  },
  {
    name: 'Dr. Sameer Pathak, MD',
    role: 'Consultant Diabetologist & Glycemic Advisor',
    focus: 'Low-GI snack swaps, maltodextrin/maltitol glycemic impact, and food sequencing.',
  },
  {
    name: 'Dr. Alok Kulkarni, MD',
    role: 'Internal Medicine & Hepatic Wellness Reviewer',
    focus: 'Trans-fat and palmolein cardiovascular risk, liver detox myths, and hydration.',
  },
  {
    name: 'Pooja Bhatia, MSc Food & Nutrition',
    role: 'Pediatric Nutritionist & Tiffin Diet Planner',
    focus: 'School-age nutrition, maida-free tiffin formulations, and kid-safe milk additives.',
  },
  {
    name: 'Kabir Mehta',
    role: 'Lead Food Label & Supply-Chain Investigator',
    focus: 'FSSAI ingredient-order decoding, INS additive audits, and quick-commerce label tracking.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/editorial-policy#webpage`,
      url: `${baseUrl}/editorial-policy`,
      name: 'GudTree Editorial Policy, Audit Methodology & Nutrition Review Board',
      description:
        'How GudTree researches, fact-checks, and updates Indian food label audits and clinical nutrition guides.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'GudTree',
        url: baseUrl,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/editorial-policy#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Editorial Policy', item: `${baseUrl}/editorial-policy` },
      ],
    },
  ],
};

export default function EditorialPolicyPage() {
  return (
    <div className="gt-container py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Editorial Policy', href: '/editorial-policy' },
        ]}
        showBackLink
        backHref="/"
        backLabel="Home"
        rightBadge="E-E-A-T Standards"
        includeJsonLd={false}
      />

      <header className="max-w-3xl mb-10 flex flex-col items-start gap-3">
        <span className="gt-badge-olive">Zero-Sponsorship Transparency</span>
        <EditorialTitle
          as="h1"
          title="Editorial Policy & Audit Standards"
          variant="hero"
          className="text-[#102A56]"
        />
        <p className="sc-lead">
          Every food label audit and diet guide on GudTree follows a strict verification framework anchored in FSSAI labelling regulations, ICMR-NIN Indian food composition tables, and peer-reviewed clinical nutrition literature.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#DA440D]/12 text-[#DA440D] flex items-center justify-center mb-4">
            <FileSearch className="w-5 h-5" />
          </div>
          <h2 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            Back-of-Pack First
          </h2>
          <p className="text-[13.5px] text-[#334155] leading-relaxed">
            We ignore front-of-pack claims ("Multigrain", "Sugar-Free", "Baked") and analyze ingredients in descending order of weight per FSSAI Food Safety and Standards (Labelling and Display) Regulations.
          </p>
        </div>

        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#0944BA]/12 text-[#0944BA] flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            Clinical Fact-Checking
          </h2>
          <p className="text-[13.5px] text-[#334155] leading-relaxed">
            Every diabetes, PCOS, gut, heart, and pediatric guide is reviewed by a medical doctor or qualified nutritionist for glycemic accuracy, safe daily upper limits, and realistic Indian kitchen swaps.
          </p>
        </div>

        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#15803D]/12 text-[#15803D] flex items-center justify-center mb-4">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            100% Brand Independence
          </h2>
          <p className="text-[13.5px] text-[#334155] leading-relaxed">
            GudTree does not accept paid brand placements, undisclosed affiliate bribes, or sponsored positive reviews. Products are purchased independently from retail and quick-commerce stores.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="sc-display-h3 text-[#102A56] flex items-center gap-2 pb-3 border-b border-[#ADC3DE]/55 mb-6">
          <Award className="w-5 h-5 text-[#DA440D]" />
          <span>GudTree Nutrition &amp; Editorial Review Board</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEW_BOARD.map((member) => (
            <div
              key={member.name}
              className="p-5 rounded-[20px] bg-white border border-[#ADC3DE]/65 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[16px] font-bold text-[#102A56]">{member.name}</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#15803D] text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-[12.5px] font-semibold text-[#0944BA]">{member.role}</p>
              <p className="text-[13px] text-[#334155] leading-relaxed mt-1">{member.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#ADC3DE]/65 space-y-4">
        <h2 className="sc-display-h3 text-[#102A56] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#DA440D]" />
          <span>Primary Reference Standards &amp; Corrections</span>
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#334155] leading-relaxed">
          <li>
            <strong>Indian Food Composition Tables (IFCT):</strong> Nutritional baselines for makhana, roasted chana, sattu, millets (ragi, jowar, bajra), and dairy are cross-referenced with ICMR-National Institute of Nutrition (NIN) data.
          </li>
          <li>
            <strong>FSSAI Labelling Compliance:</strong> Ingredient order, INS food additive codes, added sugar thresholds, and edible vegetable oil disclosures are verified against Food Safety and Standards Authority of India norms.
          </li>
          <li>
            <strong>Correction &amp; Formulation Updates:</strong> Brands regularly reformulate recipes. If a manufacturer removes palm oil or changes sugar levels, readers or brands can email{' '}
            <a href="mailto:contact@gudtree.in" className="text-[#0944BA] font-semibold underline">
              contact@gudtree.in
            </a>{' '}
            with updated batch label photos; verified updates are logged with a visible modified date.
          </li>
          <li>
            <strong>Medical Advisory:</strong> GudTree content is educational and does not replace personalized clinical care. Read our{' '}
            <Link href="/terms" className="text-[#0944BA] font-semibold underline">
              Terms &amp; Health Advisory
            </Link>
            .
          </li>
        </ul>
      </section>
    </div>
  );
}
