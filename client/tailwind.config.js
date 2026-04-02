/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#8cc63f",
          "primary-content": "#ffffff",
          "base-200": "#f3f4f6",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          primary: "#8cc63f",
          "primary-content": "#ffffff",
          "base-200": "#1f2937",
        },
      },
    ],
  },
};
