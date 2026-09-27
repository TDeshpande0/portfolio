/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Hover styles only on devices that can really hover. Phones otherwise keep a tapped element
  // "hovered", so hover-only effects (like the header's hint pill) flash on after a tap.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    // The design's layout switches at 820px (tablet/desktop) and 520px (phone).
    screens: {
      sm: "521px",
      md: "821px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        kraft: "#FFF6E3",
        "kraft-deep": "#FFE49A",
        ink: "#123B36",
        navy: "#00A6A0",
        "navy-deep": "#054C48",
        airmail: "#FF5A4E",
        gold: "#FFC53D",
        paper: "#FFFDF6",
        mint: "#2FA968",
        lav: "#FF5D8F",
        muted: "#5A7B73",
        pen: "#23449A",
      },
      fontFamily: {
        sans: ['"Work Sans"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
        fraunces: ["Fraunces", "serif"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadein: {
          to: { opacity: "1" },
        },
        flyacross: {
          "0%": {
            left: "-100px",
            transform: "translateY(-50%) rotate(0deg) scale(.85)",
          },
          "50%": { transform: "translateY(-110px) rotate(-6deg) scale(1.05)" },
          "100%": {
            left: "105%",
            transform: "translateY(-170px) rotate(-3deg) scale(1.2)",
          },
        },
        thunk: {
          from: {
            transform: "translate(-50%,-50%) rotate(-14deg) scale(1.8)",
            opacity: "0",
          },
        },
      },
      animation: {
        ticker: "ticker 90s linear infinite",
        fade: "fade .25s ease forwards",
        fadein: "fadein .4s ease .5s forwards",
        flyacross: "flyacross 2.8s cubic-bezier(.45,0,.4,1) forwards",
        thunk: "thunk .35s cubic-bezier(.3,1.6,.5,1) both",
      },
    },
  },
  plugins: [],
};
