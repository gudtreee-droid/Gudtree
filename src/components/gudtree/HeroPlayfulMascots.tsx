'use client';

import React, { useState, useEffect } from 'react';

interface MascotMeta {
  id: string;
  bubble: string;
  label: string;
  kind: 'good' | 'problem';
}

const MASCOTS: MascotMeta[] = [
  { id: 'eat', bubble: 'Crunchy Clean Snacks!', label: 'Eating Healthy', kind: 'good' },
  { id: 'read', bubble: 'Learning Clean Food!', label: 'Reading Info', kind: 'good' },
  { id: 'exercise', bubble: 'Active & Strong!', label: 'Daily Exercise', kind: 'good' },
  { id: 'oxygen', bubble: 'Junk + Scroll Trap!', label: 'Junk Fatigue', kind: 'problem' },
];

export default function HeroPlayfulMascots() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      setActiveIndex((prev) => (prev + 1) % MASCOTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const shownIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <div
      aria-label="3D Animated Healthy Habits vs Junk Trap Mascots"
      className="relative z-10 w-full max-w-[820px] mx-auto mt-2 sm:mt-4 mb-1 select-none overflow-hidden px-1"
    >
      {/* Mobile-Only Centered Speech Capsule */}
      <div className="flex sm:hidden justify-center mb-1 min-h-[28px]">
        <span
          key={MASCOTS[shownIndex].id}
          className={`px-3 py-0.5 rounded-full border-2 border-[#14181E] text-[11px] font-bold shadow-[0_2px_0_#14181E] transition-all duration-200 ${
            MASCOTS[shownIndex].kind === 'problem'
              ? 'bg-[#FFE4DE] text-[#DA440D]'
              : 'bg-[#E5F36D] text-[#102A56]'
          }`}
        >
          {MASCOTS[shownIndex].bubble}
        </span>
      </div>

      <div className="grid grid-cols-4 items-end justify-items-center gap-1 sm:gap-5 lg:gap-7">
        {/* 1. 3D MAKHANA PUFF — EATING CLEAN SNACK */}
        <div
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setActiveIndex(0)}
          className="relative flex flex-col items-center cursor-pointer w-full min-w-0 group"
        >
          <SpeechBubble visible={shownIndex === 0} text={MASCOTS[0].bubble} kind="good" />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 160 175"
              className="w-[64px] xs:w-[74px] sm:w-[134px] lg:w-[148px] h-auto overflow-hidden gt-mascot-1 group-hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <radialGradient id="mkBody" cx="35%" cy="28%" r="70%">
                  <stop offset="0%" stopColor="#FFFDF8" />
                  <stop offset="55%" stopColor="#F9ECCE" />
                  <stop offset="88%" stopColor="#DFBA86" />
                  <stop offset="100%" stopColor="#C89B62" />
                </radialGradient>
                <radialGradient id="mkBowl" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="#FF8B5E" />
                  <stop offset="65%" stopColor="#DA440D" />
                  <stop offset="100%" stopColor="#8F2604" />
                </radialGradient>
                <radialGradient id="mkShoe" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="65%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#102A56" />
                </radialGradient>
              </defs>

              <g>
                <path d="M64 134 C62 146 61 151 60 155" stroke="#DFBA86" strokeWidth="11" strokeLinecap="round" fill="none" />
                <path d="M96 134 C98 146 99 151 100 155" stroke="#DFBA86" strokeWidth="11" strokeLinecap="round" fill="none" />
                <ellipse cx="56" cy="158" rx="14" ry="7.5" fill="url(#mkShoe)" />
                <path d="M44 161 Q56 165 68 161" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <ellipse cx="104" cy="158" rx="14" ry="7.5" fill="url(#mkShoe)" />
                <path d="M92 161 Q104 165 116 161" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />

                <path
                  d="M80 28 C98 28 112 37 118 52 C128 58 134 72 130 88 C134 105 123 125 104 132 C94 137 66 137 56 132 C37 125 26 105 30 88 C26 72 32 58 42 52 C48 37 62 28 80 28 Z"
                  fill="url(#mkBody)"
                />
                <ellipse cx="62" cy="44" rx="16" ry="7" transform="rotate(-18 62 44)" fill="#FFFFFF" opacity="0.6" />
                <path d="M44 123 Q80 138 116 123" fill="none" stroke="#93D4FF" strokeWidth="3" strokeLinecap="round" opacity="0.55" />

                <ellipse cx="49" cy="83" rx="8" ry="4.5" fill="#FF7B6B" opacity="0.48" />
                <ellipse cx="111" cy="83" rx="8" ry="4.5" fill="#FF7B6B" opacity="0.48" />

                <path d="M36 94 C26 104 34 118 54 118" stroke="#E5C494" strokeWidth="12" strokeLinecap="round" fill="none" />
                <circle cx="56" cy="118" r="7.5" fill="#F9ECCE" />

                <ellipse cx="83" cy="107" rx="23" ry="8" fill="#6D2E13" />
                <ellipse cx="75" cy="105" rx="6" ry="4" transform="rotate(-20 75 105)" fill="#D98A48" />
                <ellipse cx="85" cy="103" rx="6" ry="4" transform="rotate(15 85 103)" fill="#C67232" />
                <ellipse cx="94" cy="106" rx="5.5" ry="3.8" fill="#E39D5C" />
                <path d="M60 108 C60 128 70 136 83 136 C96 136 106 128 106 108 Z" fill="url(#mkBowl)" />
                <ellipse cx="73" cy="120" rx="5" ry="9" transform="rotate(-10 73 120)" fill="#FFFFFF" opacity="0.22" />

                <g className="gt-arm-feed">
                  <path d="M122 95 C135 90 126 78 108 82" stroke="#F1D8AC" strokeWidth="12" strokeLinecap="round" fill="none" />
                  <circle cx="106" cy="82" r="7.5" fill="#FFF7E4" />
                  <ellipse cx="101" cy="79" rx="5" ry="3.2" transform="rotate(-28 101 79)" fill="#D98A48" />
                </g>

                <ellipse cx="80" cy="91" rx="7.5" ry="5" fill="#7A271A" className="gt-chew" />

                <PixarEyes leftX={63} rightX={97} y={71} eyelidColor="#F6E5C1" irisColor="#2B1A12" />
              </g>
            </svg>
            <div className="w-[74px] sm:w-[88px] h-[10px] rounded-full bg-[#0A386E] -mt-2 blur-[2px] gt-shadow-pulse" />
          </div>
        </div>

        {/* 2. 3D ALMOND SCHOLAR — READING CLEAN FOOD BOOK */}
        <div
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setActiveIndex(1)}
          className="relative flex flex-col items-center cursor-pointer w-full min-w-0 group"
        >
          <SpeechBubble visible={shownIndex === 1} text={MASCOTS[1].bubble} kind="good" />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 160 175"
              className="w-[64px] xs:w-[74px] sm:w-[134px] lg:w-[148px] h-auto overflow-hidden gt-mascot-2 group-hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <radialGradient id="alBody" cx="35%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#F9B872" />
                  <stop offset="52%" stopColor="#D67F3C" />
                  <stop offset="90%" stopColor="#9C501B" />
                  <stop offset="100%" stopColor="#7A3B10" />
                </radialGradient>
                <linearGradient id="alBook" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" />
                  <stop offset="65%" stopColor="#15803D" />
                  <stop offset="100%" stopColor="#0D4D26" />
                </linearGradient>
              </defs>

              <g>
                <ellipse cx="52" cy="148" rx="14" ry="8.5" transform="rotate(-18 52 148)" fill="#15803D" />
                <ellipse cx="52" cy="148" rx="10" ry="5" transform="rotate(-18 52 148)" fill="#FFFFFF" opacity="0.25" />
                <ellipse cx="108" cy="148" rx="14" ry="8.5" transform="rotate(18 108 148)" fill="#15803D" />
                <ellipse cx="108" cy="148" rx="10" ry="5" transform="rotate(18 108 148)" fill="#FFFFFF" opacity="0.25" />

                <path
                  d="M80 22 C106 42 126 72 124 106 C122 132 104 146 80 146 C56 146 38 132 36 106 C34 72 54 42 80 22 Z"
                  fill="url(#alBody)"
                />
                <ellipse cx="64" cy="48" rx="11" ry="20" transform="rotate(18 64 48)" fill="#FFFFFF" opacity="0.28" />

                <ellipse cx="50" cy="83" rx="7.5" ry="4" fill="#FF6B5B" opacity="0.45" />
                <ellipse cx="110" cy="83" rx="7.5" ry="4" fill="#FF6B5B" opacity="0.45" />

                <PixarEyes leftX={63} rightX={97} y={71} eyelidColor="#DE8D4B" irisColor="#1F2937" blinkDelay="1.2s" />

                <circle cx="63" cy="71" r="14" fill="rgba(255,255,255,0.14)" stroke="#1E293B" strokeWidth="3.2" />
                <circle cx="97" cy="71" r="14" fill="rgba(255,255,255,0.14)" stroke="#1E293B" strokeWidth="3.2" />
                <path d="M77 71 Q80 68 83 71" stroke="#1E293B" strokeWidth="3" fill="none" />
                <path d="M40 68 L49 70 M111 70 L120 68" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />

                <path d="M74 87 Q80 92 86 87" fill="none" stroke="#4A1D06" strokeWidth="2.8" strokeLinecap="round" />

                <g>
                  <path d="M42 100 L79 110 L79 144 L42 134 Z" fill="url(#alBook)" />
                  <path d="M118 100 L81 110 L81 144 L118 134 Z" fill="url(#alBook)" />
                  <path d="M46 96 L79 107 L79 138 L46 128 Z" fill="#FFFDF7" />
                  <path d="M114 96 L81 107 L81 138 L114 128 Z" fill="#F4EDE0" />
                  <path d="M99 116 C105 113 109 119 104 125 C99 128 95 122 99 116 Z" fill="#E5F36D" />
                  <path d="M35 104 C28 112 36 122 45 120" stroke="#DE8D4B" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="45" cy="119" r="7.5" fill="#F4A55D" />
                  <path d="M125 104 C132 112 124 122 115 120" stroke="#DE8D4B" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="115" cy="119" r="7.5" fill="#F4A55D" />
                </g>
              </g>
            </svg>
            <div className="w-[74px] sm:w-[88px] h-[10px] rounded-full bg-[#0A386E] -mt-2 blur-[2px] gt-shadow-pulse" />
          </div>
        </div>

        {/* 3. 3D FIT AVOCADO — CURLING DUMBBELLS */}
        <div
          onMouseEnter={() => setHoveredIndex(2)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setActiveIndex(2)}
          className="relative flex flex-col items-center cursor-pointer w-full min-w-0 group"
        >
          <SpeechBubble visible={shownIndex === 2} text={MASCOTS[2].bubble} kind="good" />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 170 175"
              className="w-[66px] xs:w-[76px] sm:w-[138px] lg:w-[152px] h-auto overflow-hidden gt-mascot-3 group-hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <radialGradient id="avOuter" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="#6CD96A" />
                  <stop offset="60%" stopColor="#26873C" />
                  <stop offset="100%" stopColor="#134E21" />
                </radialGradient>
                <radialGradient id="avInner" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#F5F9A8" />
                  <stop offset="60%" stopColor="#C9E265" />
                  <stop offset="100%" stopColor="#8DBB44" />
                </radialGradient>
                <radialGradient id="avPit" cx="35%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#E69156" />
                  <stop offset="55%" stopColor="#A65423" />
                  <stop offset="100%" stopColor="#5C280B" />
                </radialGradient>
                <linearGradient id="avHeadband" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF7A45" />
                  <stop offset="50%" stopColor="#DA440D" />
                  <stop offset="100%" stopColor="#9A2D06" />
                </linearGradient>
                <radialGradient id="avDb" cx="35%" cy="25%" r="75%">
                  <stop offset="0%" stopColor="#5EEAD4" />
                  <stop offset="65%" stopColor="#0F766E" />
                  <stop offset="100%" stopColor="#083B37" />
                </radialGradient>
              </defs>

              <g>
                <path d="M68 136 L65 154 M102 136 L105 154" stroke="#26873C" strokeWidth="11" strokeLinecap="round" fill="none" />
                <ellipse cx="60" cy="158" rx="14" ry="7.5" fill="#DA440D" />
                <path d="M48 161 Q60 165 72 161" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <ellipse cx="110" cy="158" rx="14" ry="7.5" fill="#DA440D" />
                <path d="M98 161 Q110 165 122 161" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />

                <path
                  d="M85 22 C108 22 122 46 128 74 C134 102 125 140 85 140 C45 140 36 102 42 74 C48 46 62 22 85 22 Z"
                  fill="url(#avOuter)"
                />
                <path
                  d="M85 30 C104 30 116 52 121 76 C126 100 119 132 85 132 C51 132 44 100 49 76 C54 52 66 30 85 30 Z"
                  fill="url(#avInner)"
                />

                <circle cx="85" cy="105" r="21" fill="url(#avPit)" />
                <ellipse cx="77" cy="96" rx="7" ry="4" transform="rotate(-30 77 96)" fill="#FFFFFF" opacity="0.4" />

                <path d="M47 49 Q85 41 123 49 L121 59 Q85 52 49 59 Z" fill="url(#avHeadband)" />

                <PixarEyes leftX={69} rightX={101} y={69} eyelidColor="#CFE66E" irisColor="#1F2937" blinkDelay="0.6s" />
                <ellipse cx="56" cy="77" rx="7" ry="4" fill="#FF7360" opacity="0.52" />
                <ellipse cx="114" cy="77" rx="7" ry="4" fill="#FF7360" opacity="0.52" />
                <path d="M77 77 Q85 85 93 77" fill="#7A1C12" />

                <g className="gt-db-left">
                  <path d="M45 84 C28 84 22 68 25 56" stroke="#3FA34D" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="25" cy="54" r="7" fill="#74C65E" />
                  <rect x="8" y="49" width="34" height="6" rx="3" fill="#CBD5E1" />
                  <ellipse cx="10" cy="52" rx="6" ry="12" fill="url(#avDb)" />
                  <ellipse cx="40" cy="52" rx="6" ry="12" fill="url(#avDb)" />
                </g>

                <g className="gt-db-right">
                  <path d="M125 84 C142 84 148 68 145 56" stroke="#3FA34D" strokeWidth="11" strokeLinecap="round" fill="none" />
                  <circle cx="145" cy="54" r="7" fill="#74C65E" />
                  <rect x="128" y="49" width="34" height="6" rx="3" fill="#CBD5E1" />
                  <ellipse cx="130" cy="52" rx="6" ry="12" fill="url(#avDb)" />
                  <ellipse cx="160" cy="52" rx="6" ry="12" fill="url(#avDb)" />
                </g>
              </g>
            </svg>
            <div className="w-[74px] sm:w-[90px] h-[10px] rounded-full bg-[#0A386E] -mt-2 blur-[2px] gt-shadow-pulse" />
          </div>
        </div>

        {/* 4. 3D TIRED JUNK FRY BOX — OXYGEN MASK + PHONE DOOMSCROLL */}
        <div
          onMouseEnter={() => setHoveredIndex(3)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setActiveIndex(3)}
          className="relative flex flex-col items-center cursor-pointer w-full min-w-0 group"
        >
          <SpeechBubble visible={shownIndex === 3} text={MASCOTS[3].bubble} kind="problem" />

          <div className="relative flex flex-col items-center">
            <svg
              viewBox="0 0 175 175"
              className="w-[68px] xs:w-[78px] sm:w-[140px] lg:w-[154px] h-auto overflow-hidden gt-mascot-4 group-hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <linearGradient id="frCushion" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="65%" stopColor="#7DD3FC" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
                <linearGradient id="frBox" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="55%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
                <linearGradient id="frFry" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="60%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="frTank" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="45%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
                <radialGradient id="frScreenGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g>
                <path
                  d="M22 128 C22 108 134 108 134 128 C134 148 118 158 78 158 C38 158 22 148 22 128 Z"
                  fill="url(#frCushion)"
                />
                <ellipse cx="78" cy="116" rx="44" ry="8" fill="#FFFFFF" opacity="0.35" />

                <rect x="134" y="102" width="22" height="50" rx="11" fill="url(#frTank)" />
                <rect x="141" y="94" width="8" height="10" rx="2" fill="#94A3B8" />
                <circle cx="145" cy="92" r="4" fill="#0284C7" />
                <path
                  d="M141 97 C128 97 122 122 108 122 C96 122 86 116 80 105"
                  fill="none"
                  stroke="#E0F2FE"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <circle cx="126" cy="108" r="2.4" fill="#FFFFFF" opacity="0.7" />

                <rect x="46" y="26" width="11" height="36" rx="4" transform="rotate(-8 46 26)" fill="url(#frFry)" />
                <rect x="61" y="20" width="11" height="40" rx="4" transform="rotate(-3 61 20)" fill="url(#frFry)" />
                <rect x="75" y="24" width="11" height="38" rx="4" fill="url(#frFry)" />
                <rect x="89" y="19" width="11" height="40" rx="4" transform="rotate(4 89 19)" fill="url(#frFry)" />
                <rect x="102" y="28" width="10" height="34" rx="4" transform="rotate(10 102 28)" fill="url(#frFry)" />

                <path d="M42 52 Q78 60 116 52 L108 126 Q78 134 50 126 Z" fill="url(#frBox)" />
                <ellipse cx="62" cy="72" rx="6" ry="18" fill="#FFFFFF" opacity="0.16" />

                <ellipse cx="52" cy="145" rx="11" ry="7.5" transform="rotate(-12 52 145)" fill="#E11D48" />
                <ellipse cx="102" cy="145" rx="11" ry="7.5" transform="rotate(12 102 145)" fill="#E11D48" />

                <ellipse cx="64" cy="83" rx="8" ry="4" fill="#581C87" opacity="0.35" />
                <ellipse cx="94" cy="83" rx="8" ry="4" fill="#581C87" opacity="0.35" />
                <PixarEyes leftX={64} rightX={94} y={76} eyelidColor="#EB4564" irisColor="#1E293B" sleepy blinkDelay="0.4s" />

                <path d="M46 86 Q60 94 70 96 M112 86 Q98 94 88 96" stroke="#BAE6FD" strokeWidth="2.4" fill="none" />
                <path
                  d="M79 80 C88 80 94 94 92 103 C89 109 69 109 66 103 C64 94 70 80 79 80 Z"
                  fill="rgba(224,242,254,0.78)"
                  stroke="#7DD3FC"
                  strokeWidth="2.2"
                />
                <circle cx="79" cy="105" r="4.5" fill="#7DD3FC" />

                <circle cx="38" cy="108" r="24" fill="url(#frScreenGlow)" />
                <g className="gt-phone-rock">
                  <rect x="24" y="96" width="21" height="31" rx="5" transform="rotate(-14 24 96)" fill="#0F172A" />
                  <rect x="27" y="99" width="15" height="23" rx="3" transform="rotate(-14 27 99)" fill="#60A5FA" />
                  <path d="M49 112 C42 114 38 118 36 116" stroke="#FB7185" strokeWidth="9" strokeLinecap="round" fill="none" />
                  <circle cx="35" cy="116" r="6" fill="#FDA4AF" />
                  <path d="M104 108 C92 122 68 122 46 114" stroke="#E11D48" strokeWidth="9" strokeLinecap="round" fill="none" />
                </g>
              </g>
            </svg>
            <div className="w-[92px] sm:w-[110px] h-[10px] rounded-full bg-[#0A386E] -mt-2 blur-[2px] gt-shadow-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PixarEyes({
  leftX,
  rightX,
  y,
  eyelidColor,
  irisColor,
  sleepy = false,
  blinkDelay = '0s',
}: {
  leftX: number;
  rightX: number;
  y: number;
  eyelidColor: string;
  irisColor: string;
  sleepy?: boolean;
  blinkDelay?: string;
}) {
  const eyes = [leftX, rightX];

  return (
    <g>
      {eyes.map((cx, i) => (
        <g key={i}>
          <ellipse cx={cx} cy={y} rx="9.5" ry="11" fill="#FFFFFF" />
          <path
            d={`M ${cx - 8.5} ${y - 4} Q ${cx} ${y - 11} ${cx + 8.5} ${y - 4}`}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx={cx} cy={y + 0.8} r="5.6" fill={irisColor} />
          <circle cx={cx} cy={y + 0.8} r="3" fill="#090D16" />
          <circle cx={cx - 1.9} cy={y - 1.5} r="2.1" fill="#FFFFFF" />
          <circle cx={cx + 1.8} cy={y + 2.4} r="0.95" fill="#FFFFFF" opacity="0.85" />

          <rect
            x={cx - 11}
            y={y - 12}
            width="22"
            height={sleepy ? 9.5 : 1.8}
            rx="4"
            fill={eyelidColor}
            className={sleepy ? 'gt-eye-blink-sleepy' : 'gt-eye-blink'}
            style={{
              transformOrigin: `${cx}px ${y - 12}px`,
              animationDelay: blinkDelay,
            }}
          />
        </g>
      ))}
    </g>
  );
}

function SpeechBubble({
  visible,
  text,
  kind,
}: {
  visible: boolean;
  text: string;
  kind: 'good' | 'problem';
}) {
  return (
    <div className="hidden sm:flex h-[32px] items-end justify-center mb-1">
      {visible && (
        <div
          className={`px-3 py-0.5 rounded-full border-2 border-[#14181E] text-[11px] font-bold whitespace-nowrap shadow-[0_3px_0_#14181E] transition-all duration-200 ${
            kind === 'problem'
              ? 'bg-[#FFE4DE] text-[#DA440D]'
              : 'bg-[#E5F36D] text-[#102A56]'
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
