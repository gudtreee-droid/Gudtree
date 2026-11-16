import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gt: {
          canvas: "#FFF9EC",        /* Sunday Crumb Buttercream */
          card: "#FFFFFF",          /* Crisp Milk White */
          parchment: "#DFE5D7",     /* Sunday Crumb Botanical Sage */
          sky: "#D6EDFF",           /* Sunday Crumb Soft Sky */
          elevated: "#FFFDF7",      /* Soft Warm Highlight */
          espresso: "#102A56",      /* Sunday Crumb Deep Midnight Navy Ink */
          cocoa: "#2B2B2B",         /* Dark Charcoal Body */
          hazelnut: "#666666",      /* Sunday Crumb Muted Grey */
          olive: "#0944BA",         /* Sunday Crumb Cobalt Blue */
          forest: "#0D120B",        /* Sunday Crumb Deep Forest */
          sandstone: "#ADC3DE",     /* Sunday Crumb Powder Border */
          caramel: "#DA440D",       /* Sunday Crumb Burnt Tangerine Accent */
          caramelDark: "#B83607",   /* Deep Tangerine Hover */
          marigold: "#E5F36D",      /* Sunday Crumb Citrus Lime Highlight */
          sprout: "#171D15",        /* Sunday Crumb Charcoal Pine */
        },
        paper: {
          DEFAULT: "#FFF9EC",
          light: "#FFFFFF",
          dark: "#DFE5D7",
          subtle: "#D6EDFF",
          border: "#ADC3DE",
          borderDark: "rgba(255, 249, 236, 0.16)",
        },
        ink: {
          DEFAULT: "#102A56",
          dark: "#0D120B",
          black: "#000000",
          muted: "#666666",
          submuted: "#999999",
          light: "#FFF9EC",
        },
        editorial: {
          red: "#DA440D",
          navy: "#102A56",
        }
      },
      fontFamily: {
        serif: ["var(--font-lilita)", "var(--font-inter)", "sans-serif"],
        display: ["var(--font-lilita)", "var(--font-inter)", "sans-serif"],
        headline: ["var(--font-lilita)", "var(--font-inter)", "sans-serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        'page': '1320px',
        'reading': '720px',
      },
      borderRadius: {
        'bento': '24px',
        'sheet': '32px',
      },
      boxShadow: {
        'gt-card': '0 4px 20px -4px rgba(16, 42, 86, 0.06)',
        'gt-hover': '0 20px 40px -12px rgba(16, 42, 86, 0.12)',
        'gt-island': '0 12px 36px -8px rgba(16, 42, 86, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
