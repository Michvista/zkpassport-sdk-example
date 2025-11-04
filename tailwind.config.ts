import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      colors: {
        blue: "#3981F7",
        darkBlue:"#113665",
        blackBlue:"#08172A",
        lightBlue: "#14ADD6",
        gradientBlue:"#384295",
        topBlue: "#236DCB",
        bottomBlue: "#113665",
        ashIn: "#B3B3B3",
        ashOutline: "#777777",
        green:"#00D364",
        purple: "#8646FF",
        yellow: "#FFAE16",
        transBg: "#FFFFFF1A"
      },
    },
  },
  plugins: [],
} satisfies Config;
