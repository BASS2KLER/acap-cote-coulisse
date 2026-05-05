import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tons spectacles — 4 couleurs éditoriales
        rose: {
          DEFAULT: "#D89B9B",
          deep:    "#B26F70",
          wash:    "#F0DCD9",
        },
        mousse: {
          DEFAULT: "#94A287",
          deep:    "#5F6E54",
          wash:    "#DEE3D3",
        },
        moutarde: {
          DEFAULT: "#C8A24A",
          deep:    "#8E6F22",
          wash:    "#EFE3BE",
        },
        lavande: {
          DEFAULT: "#9AA0C4",
          deep:    "#5E6593",
          wash:    "#DDDFEC",
        },
        // Fonds papier / carton
        paper: {
          DEFAULT: "#F5EFE3",
          warm:    "#EFE6D2",
          deep:    "#E6DCC4",
        },
        // Encre
        encre:        "#2A2722",
        "encre-douce":"#4A463E",
        "encre-muted":"#7A7568",
        // Aliases compatibilité v1 → v2
        creme:        "#F5EFE3",
        "creme-pale": "#FBF7EC",
        "creme-deep": "#E6DCC4",
        filet:        "#C9C0AB",
      },
      fontFamily: {
        serif:   ["var(--font-fraunces)", "Georgia", "serif"],
        sans:    ["var(--font-worksans)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "var(--font-fraunces)", "serif"],
        // aliases v1
        body:    ["var(--font-worksans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.75rem",   { lineHeight: "1.4" }],
        xs:    ["0.8125rem", { lineHeight: "1.5" }],
        sm:    ["0.875rem",  { lineHeight: "1.5" }],
        base:  ["1rem",      { lineHeight: "1.55" }],
        md:    ["1.125rem",  { lineHeight: "1.5" }],
        lg:    ["1.375rem",  { lineHeight: "1.45" }],
        xl:    ["1.75rem",   { lineHeight: "1.25" }],
        "2xl": ["2.25rem",   { lineHeight: "1.15" }],
        "3xl": ["3rem",      { lineHeight: "1.08" }],
        "4xl": ["4rem",      { lineHeight: "1" }],
        "5xl": ["5.5rem",    { lineHeight: "0.96" }],
      },
      borderRadius: {
        xs:   "2px",
        sm:   "4px",
        md:   "6px",
        lg:   "8px",
        xl:   "12px",
        pill: "999px",
      },
      boxShadow: {
        paper:            "0 1px 0 rgba(42,39,34,0.04), 0 2px 6px rgba(42,39,34,0.06)",
        card:             "0 2px 0 rgba(42,39,34,0.05), 0 8px 18px -10px rgba(42,39,34,0.18)",
        lift:             "0 4px 0 rgba(42,39,34,0.06), 0 18px 30px -16px rgba(42,39,34,0.22)",
        "print-rose":     "6px 6px 0 #F0DCD9",
        "print-mousse":   "6px 6px 0 #DEE3D3",
        "print-moutarde": "6px 6px 0 #EFE3BE",
        "print-lavande":  "6px 6px 0 #DDDFEC",
        "print-deep":     "8px 8px 0 #E6DCC4",
        // aliases v1
        encre:    "4px 4px 0 #2A2722",
        "encre-lg": "6px 6px 0 #2A2722",
        "encre-xl": "8px 8px 0 #2A2722",
      },
      maxWidth: {
        prose: "680px",
        page:  "1280px",
        wide:  "1440px",
      },
      transitionTimingFunction: {
        smile: "cubic-bezier(.34, 1.36, .64, 1)",
        soft:  "cubic-bezier(.4, 0, .2, 1)",
        // alias v1
        bounce: "cubic-bezier(.34, 1.56, .64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
