import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
import { tailwindColors } from "./colors";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#111827", // gray-900
              50: "#f9fafb",
              100: "#f3f4f6",
              200: "#e5e7eb",
              300: "#d1d5db",
              400: "#9ca3af",
              500: "#6b7280",
              600: "#4b5563",
              700: "#374151",
              800: "#1f2937",
              900: "#111827",
              foreground: "#FFFFFF",
            },
            focus: "#374151",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#111827", // gray-900
              50: "#f9fafb",
              100: "#f3f4f6",
              200: "#e5e7eb",
              300: "#d1d5db",
              400: "#9ca3af",
              500: "#6b7280",
              600: "#4b5563",
              700: "#374151",
              800: "#1f2937",
              900: "#111827",
              foreground: "#FFFFFF",
            },
            focus: "#374151",
          },
        },
      },
    }),
  ],
} satisfies Config;
