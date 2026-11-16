'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function WriteForUsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'Healthy Snacks',
    pitchTitle: '',
    synopsis: '',
    sampleUrl: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.pitchTitle || !formData.synopsis) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 350);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#ADC3DE]/65 rounded-[24px] p-6 sm:p-8 text-center">
        <CheckCircle2 className="w-11 h-11 text-[#0944BA] mx-auto mb-3" />
        <h3 className="sc-display-h3 text-[#102A56]">
          Pitch Received
        </h3>
        <p className="text-[13px] text-[#666666] mt-2 leading-relaxed">
          Thank you for submitting your pitch to GudTree. Our nutrition editors will review your outline and reply to{' '}
          <span className="font-semibold text-[#102A56]">{formData.email}</span> within 2–3 business days.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              topic: 'Healthy Snacks',
              pitchTitle: '',
              synopsis: '',
              sampleUrl: '',
            });
          }}
          className="mt-5 sc-display-sm text-[14px] bg-[#102A56] hover:bg-[#DA440D] text-[#FFF9EC] px-5 h-10 rounded-full transition-colors cursor-pointer"
        >
          Submit Another Pitch
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ADC3DE]/65 rounded-[24px] p-6">
      <div className="flex items-center gap-2 pb-3 mb-5 border-b border-[#ADC3DE]/55">
        <MessageSquare className="w-4 h-4 text-[#DA440D]" />
        <h3 className="sc-display-sm text-[20px] text-[#102A56]">
          Submit Editorial Pitch
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Dr. Ananya Sharma"
            className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ananya@nutritionclinic.in"
            className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
              Credential / Role
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Clinical Dietitian"
              className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
              Shelf / Beat
            </label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
            >
              <option value="Healthy Snacks">Healthy Packaged Snacks</option>
              <option value="Diabetes Care">Diabetes &amp; Low-GI Diet</option>
              <option value="PCOS & Hormones">PCOS &amp; Hormone Nutrition</option>
              <option value="Heart & Cholesterol">Heart &amp; Zero-Palm-Oil</option>
              <option value="Gut Health">Gut Health &amp; Fiber</option>
              <option value="Label Audit">Packaged Food Label Audit</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
            Proposed Headline *
          </label>
          <input
            type="text"
            required
            value={formData.pitchTitle}
            onChange={(e) => setFormData({ ...formData, pitchTitle: e.target.value })}
            placeholder="7 Hidden Maltodextrin Traps in Everyday Indian Biscuits"
            className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
            Outline &amp; Key Evidence *
          </label>
          <textarea
            rows={4}
            required
            value={formData.synopsis}
            onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
            placeholder="Summarize nutrition facts, ingredient lists examined, and practical swaps for GudTree readers..."
            className="w-full text-[13px] p-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
          />
        </div>

        <div>
          <label className="block text-[12px] font-semibold text-[#102A56] mb-1">
            Writing Sample URL (Optional)
          </label>
          <input
            type="url"
            value={formData.sampleUrl}
            onChange={(e) => setFormData({ ...formData, sampleUrl: e.target.value })}
            placeholder="https://..."
            className="w-full h-10 text-[13px] px-3.5 bg-[#FFF9EC] border border-[#ADC3DE]/70 rounded-xl text-[#102A56] focus:outline-none focus:border-[#DA440D]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-[#DA440D] hover:bg-[#102A56] text-[#FFF9EC] sc-display-sm text-[15px] flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-full"
        >
          {isSubmitting ? (
            <span>Sending Pitch...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Pitch</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-[#666666] text-center">
          Direct email: <span className="font-semibold text-[#102A56]">contact@gudtree.in</span>
        </p>
      </form>
    </div>
  );
}
