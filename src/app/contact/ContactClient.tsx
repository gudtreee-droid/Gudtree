'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { CATEGORIES as INITIAL_CATEGORIES } from '@/data/categories';
import { Category } from '@/types';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import EditorialTitle from '@/components/gudtree/EditorialTitle';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        const list = Array.isArray(payload) ? payload : payload?.data;
        if (Array.isArray(list) && list.length > 0) setCategories(list);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="gt-container py-6 sm:py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' },
        ]}
        showBackLink
        backHref="/"
        backLabel="Home"
        rightBadge="Editorial Desk"
        includeJsonLd={false}
      />

      <div className="max-w-3xl mb-10 flex flex-col items-start gap-3">
        <span className="gt-badge-olive">GudTree Desk</span>
        <EditorialTitle
          as="h1"
          title="Contact GudTree"
          variant="hero"
          className="text-[#102A56]"
        />
        <p className="sc-lead">
          Have a healthy snack audit request, nutritionist contributor pitch, clean food brand sample, or reader question? Connect directly with our editorial desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-7 bg-white border border-[#ADC3DE]/65 rounded-[24px] p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#ADC3DE]/55">
            <MessageSquare className="w-5 h-5 text-[#DA440D]" />
            <h2 className="sc-display-h3 text-[#102A56]">
              Send an Editorial Message
            </h2>
          </div>

          {submitted ? (
            <div className="bg-[#FFF9EC] border border-[#ADC3DE]/65 rounded-[20px] p-8 text-center my-4">
              <CheckCircle2 className="w-11 h-11 text-[#0944BA] mx-auto mb-3" />
              <h3 className="sc-display-h3 text-[#102A56]">Message Received</h3>
              <p className="text-[14px] text-[#666666] mt-2 max-w-md mx-auto">
                Thank you for reaching out to GudTree. Our nutrition and editorial desk will review your message and respond within 1–2 business days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    category: 'General Inquiry',
                    message: '',
                  });
                }}
                className="mt-6 bg-[#102A56] hover:bg-[#DA440D] text-[#FFF9EC] sc-display-sm text-[14px] px-6 h-10 rounded-full transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-[14px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#102A56] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rohan Mehta"
                    className="w-full h-10 bg-[#FFF9EC] text-[#102A56] px-3.5 rounded-xl border border-[#ADC3DE]/70 focus:outline-none focus:border-[#DA440D]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#102A56] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rohan@example.com"
                    className="w-full h-10 bg-[#FFF9EC] text-[#102A56] px-3.5 rounded-xl border border-[#ADC3DE]/70 focus:outline-none focus:border-[#DA440D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-[#102A56] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Snack label audit or nutrition query"
                    className="w-full h-10 bg-[#FFF9EC] text-[#102A56] px-3.5 rounded-xl border border-[#ADC3DE]/70 focus:outline-none focus:border-[#DA440D]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#102A56] mb-1.5">
                    Editorial Desk
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 bg-[#FFF9EC] text-[#102A56] px-3.5 rounded-xl border border-[#ADC3DE]/70 focus:outline-none focus:border-[#DA440D]"
                  >
                    <option value="General Inquiry">General Editorial Inquiry</option>
                    <option value="Snack Label Audit">Packaged Snack Label Audit</option>
                    <option value="Nutritionist Pitch">Nutritionist &amp; Dietitian Pitch</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#102A56] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details of your snack inquiry, patient nutrition question, or editorial pitch..."
                  className="w-full bg-[#FFF9EC] text-[#102A56] p-3.5 rounded-xl border border-[#ADC3DE]/70 focus:outline-none focus:border-[#DA440D]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#102A56] hover:bg-[#DA440D] text-[#FFF9EC] sc-display-sm text-[15px] rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send To GudTree Desk</span>
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 bg-white border border-[#ADC3DE]/65 rounded-[24px] space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#DA440D]">
              Direct Channels
            </h3>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#102A56] mt-1" />
              <div>
                <div className="text-[14px] font-semibold text-[#102A56]">Editorial Email</div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[13px] text-[#666666] hover:text-[#DA440D] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {siteConfig.contact.phone && (
              <div className="flex items-start gap-3 pt-3 border-t border-[#ADC3DE]/55">
                <Phone className="w-4 h-4 text-[#102A56] mt-1" />
                <div>
                  <div className="text-[14px] font-semibold text-[#102A56]">Reader Line</div>
                  <div className="text-[13px] text-[#666666]">{siteConfig.contact.phone}</div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-[#DFE5D7]/60 border border-[#ADC3DE]/65 rounded-[24px]">
            <div className="flex items-center gap-2 text-[#0944BA] text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
              <MapPin className="w-4 h-4 text-[#DA440D]" />
              <span>Primary Desk</span>
            </div>
            <h4 className="sc-display-sm text-[17px] text-[#102A56]">
              {siteConfig.contact.addressNY?.title || 'GudTree Editorial Studio'}
            </h4>
            <p className="text-[13px] text-[#666666] mt-1 leading-relaxed">
              {siteConfig.contact.addressNY?.street}
              <br />
              {siteConfig.contact.addressNY?.city}, {siteConfig.contact.addressNY?.country}
            </p>
          </div>

          <div className="p-6 bg-white border border-[#ADC3DE]/65 rounded-[24px]">
            <div className="flex items-center gap-2 text-[#0944BA] text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
              <MapPin className="w-4 h-4 text-[#DA440D]" />
              <span>Nutrition Review Lab</span>
            </div>
            <h4 className="sc-display-sm text-[17px] text-[#102A56]">
              {siteConfig.contact.addressLondon?.title || 'Clean Label Advisory'}
            </h4>
            <p className="text-[13px] text-[#666666] mt-1 leading-relaxed">
              {siteConfig.contact.addressLondon?.street}
              <br />
              {siteConfig.contact.addressLondon?.city}, {siteConfig.contact.addressLondon?.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
