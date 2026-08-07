import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        lineStrong: "rgb(var(--line-strong) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        dim: "rgb(var(--dim) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        violet: "rgb(var(--accent-2) / <alpha-value>)",
        mint: "rgb(var(--accent-3) / <alpha-value>)",
        amber: "rgb(var(--amber) / <alpha-value>)",
        rose: "rgb(var(--rose) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        lime: "rgb(var(--lime) / <alpha-value>)",
        // Per-card theme slots, set as inline custom properties on each project
        // card so its whole subtree can be recoloured from one place.
        card: "rgb(var(--c-accent) / <alpha-value>)",
        cardAlt: "rgb(var(--c-accent-2) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        plex: ["var(--font-plex)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Resolves to whichever face the active card theme selected.
        cardTitle: ["var(--c-font)", "var(--font-display)", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        // Fluid scale — no fixed breakpoint jumps. Ceilings are deliberately
        // modest: past roughly 4rem a headline stops being read and starts
        // being decoded one word at a time.
        "display-xl": ["clamp(2.125rem, 1.1rem + 3.9vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.875rem, 1.15rem + 2.9vw, 3.125rem)", { lineHeight: "1.1", letterSpacing: "-0.028em" }],
        "display-md": ["clamp(1.5rem, 1.1rem + 1.8vw, 2.375rem)", { lineHeight: "1.16", letterSpacing: "-0.022em" }],
        "display-sm": ["clamp(1.25rem, 1.05rem + 0.85vw, 1.625rem)", { lineHeight: "1.25", letterSpacing: "-0.018em" }],
        lead: ["clamp(1rem, 0.96rem + 0.25vw, 1.125rem)", { lineHeight: "1.65" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        shell: "84rem",
        measure: "42rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 24px 60px -30px rgb(0 0 0 / 0.9)",
        lift: "0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 40px 90px -40px rgb(0 0 0 / 1)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.35), 0 20px 60px -24px rgb(var(--accent) / 0.55)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        sweep: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(300%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.82)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        sweep: "sweep 4.5s ease-in-out infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
