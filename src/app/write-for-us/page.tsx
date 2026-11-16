import React from 'react';
import { Metadata } from 'next';
import { BookOpen, Users, ShieldCheck, TrendingUp, Award, HelpCircle, Sparkles } from 'lucide-react';
import WriteForUsForm from './WriteForUsForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import EditorialTitle from '@/components/gudtree/EditorialTitle';
import { getSiteBaseUrl } from '@/lib/articlePageHelpers';

const baseUrl = getSiteBaseUrl();

export const metadata: Metadata = {
  title: 'Write For Us | Nutrition & Clean Snacking Contributors | GudTree',
  description:
    'Contribute nutrition essays, packaged snack label audits, dietitian perspectives, and patient-friendly meal guides to GudTree.',
  alternates: { canonical: `${baseUrl}/write-for-us` },
  openGraph: {
    title: 'Write For Us | Contributor Guidelines | GudTree',
    description:
      'Contribute evidence-backed nutrition stories, clean snacking guides, and ingredient breakdowns to GudTree.',
    url: `${baseUrl}/write-for-us`,
    siteName: 'GudTree',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Write For Us | GudTree',
    description:
      'Submit nutrition guides, clean-label food audits, and dietitian insights to GudTree editors.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/write-for-us#webpage`,
      url: `${baseUrl}/write-for-us`,
      name: 'Write For Us - GudTree Contributor Guidelines',
      description:
        'Contribute nutrition essays, packaged snack audits, and wellness perspectives to GudTree.',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'GudTree',
        url: baseUrl,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${baseUrl}/write-for-us#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Write For Us', item: `${baseUrl}/write-for-us` },
      ],
    },
  ],
};

export default function WriteForUsPage() {
  return (
    <div className="gt-container py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Write For Us', href: '/write-for-us' },
        ]}
        showBackLink
        backHref="/"
        backLabel="Home"
        rightBadge="Contributors"
        includeJsonLd={false}
      />

      <header className="max-w-3xl mb-10 flex flex-col items-start gap-3">
        <span className="gt-badge-olive">Nutrition Contributor Network</span>
        <EditorialTitle
          as="h1"
          title="Write For GudTree"
          variant="hero"
          className="text-[#102A56]"
        />
        <p className="sc-lead">
          Share nutritionist guides, packaged snack audits, glycemic-friendly recipes, and real patient wellness insights with GudTree readers across India.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#DA440D]/12 text-[#DA440D] flex items-center justify-center mb-4">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            Health-Conscious Audience
          </h3>
          <p className="text-[13px] text-[#666666] leading-relaxed">
            Reach Indian families, diabetics, fitness seekers, and clean-snacking shoppers looking for trustworthy label advice.
          </p>
        </div>

        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#DA440D]/12 text-[#DA440D] flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            Verified Nutrition Byline
          </h3>
          <p className="text-[13px] text-[#666666] leading-relaxed">
            Every published contributor receives a verified author profile and full attribution across our archive.
          </p>
        </div>

        <div className="p-6 rounded-[24px] bg-white border border-[#ADC3DE]/65">
          <div className="w-10 h-10 rounded-full bg-[#DA440D]/12 text-[#DA440D] flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="sc-display-sm text-[19px] text-[#102A56] mb-2">
            Curated Editorial Reach
          </h3>
          <p className="text-[13px] text-[#666666] leading-relaxed">
            Selected snacking guides and label deep-dives are spotlighted across GudTree homepage shelves.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7 space-y-8">
          <section className="space-y-4">
            <h2 className="sc-display-h3 text-[#102A56] flex items-center gap-2 pb-3 border-b border-[#ADC3DE]/55">
              <BookOpen className="w-5 h-5 text-[#DA440D]" />
              <span>Beats &amp; Topics We Welcome</span>
            </h2>
            <p className="text-[14px] text-[#666666] leading-relaxed">
              We prioritize clear, label-checked, practical writing across core healthy eating topics:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13px] font-medium text-[#102A56]">
              {[
                'Clean Packaged Snack Audits',
                'Diabetes & Low-GI Eating',
                'PCOS & Hormone-Friendly Diets',
                'Heart-Healthy & Zero-Palm-Oil Swaps',
                'Gut Microbiome & Fermented Foods',
                'Reading Indian Nutrition Labels',
                'High-Protein Vegetarian Snacks',
                'Millets, Seeds & Traditional Pantry',
              ].map((topic) => (
                <li key={topic} className="flex items-center gap-2">
                  <span className="text-[#DA440D] font-bold">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="sc-display-h3 text-[#102A56] flex items-center gap-2 pb-3 border-b border-[#ADC3DE]/55">
              <ShieldCheck className="w-5 h-5 text-[#DA440D]" />
              <span>Editorial Standards</span>
            </h2>
            <div className="space-y-3 text-[13px] text-[#666666] leading-relaxed">
              <div className="p-4 rounded-[18px] bg-[#D6EDFF]/45 border-l-4 border-[#DA440D]">
                <strong className="text-[#102A56] block mb-1">1. Evidence &amp; Label Transparency</strong>
                Submissions should cite real nutrition panels, peer-reviewed guidance, or clear ingredient breakdowns rather than generic claims.
              </div>
              <div className="p-4 rounded-[18px] bg-[#D6EDFF]/45 border-l-4 border-[#DA440D]">
                <strong className="text-[#102A56] block mb-1">2. Structure &amp; Easy Readability</strong>
                Target 800 to 2,000 words with crisp subheadings, scannable takeaways, and everyday Indian food examples.
              </div>
              <div className="p-4 rounded-[18px] bg-[#D6EDFF]/45 border-l-4 border-[#DA440D]">
                <strong className="text-[#102A56] block mb-1">3. Unbiased, Reader-First Tone</strong>
                Reader health comes first; hidden brand promos or unverified miracle cure claims are declined.
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="sc-display-h3 text-[#102A56] flex items-center gap-2 pb-3 border-b border-[#ADC3DE]/55">
              <Sparkles className="w-5 h-5 text-[#DA440D]" />
              <span>Publication Workflow</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: '01', title: 'Pitch Outline', desc: 'Send your headline and angle through our contributor form.' },
                { num: '02', title: 'Nutrition Desk Review', desc: 'Editors review pitches within 48–72 business hours.' },
                { num: '03', title: 'Feature Release', desc: 'Approved guides go live on GudTree shelves.' },
              ].map((step) => (
                <div
                  key={step.num}
                  className="p-4 rounded-[20px] bg-white border border-[#ADC3DE]/65 text-center"
                >
                  <span className="sc-display-sm text-[20px] text-[#DA440D]">{step.num}</span>
                  <h4 className="sc-display-sm text-[15px] text-[#102A56] mt-1">{step.title}</h4>
                  <p className="text-[12px] text-[#666666] mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[110px]">
            <WriteForUsForm />
          </div>
        </div>
      </div>

      <div className="border-t border-[#ADC3DE]/60 pt-10">
        <h2 className="sc-display-h3 text-[#102A56] mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#DA440D]" />
          <span>Contributor FAQs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[13px] text-[#666666]">
          <div className="p-5 rounded-[20px] bg-white border border-[#ADC3DE]/65">
            <h4 className="sc-display-sm text-[16px] text-[#102A56] mb-1.5">
              How long does editorial review take?
            </h4>
            <p className="leading-relaxed">
              Our desk reviews pitches within 2 to 3 business days and replies directly by email if approved for drafting.
            </p>
          </div>
          <div className="p-5 rounded-[20px] bg-white border border-[#ADC3DE]/65">
            <h4 className="sc-display-sm text-[16px] text-[#102A56] mb-1.5">
              Can snack brands send samples for label review?
            </h4>
            <p className="leading-relaxed">
              Yes — brands and nutritionists can reach our editorial review team directly at{' '}
              <a
                href="mailto:contact@gudtree.in"
                className="text-[#DA440D] font-medium underline"
              >
                contact@gudtree.in
              </a>
              . Note that all reviews follow an independent label audit standard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
