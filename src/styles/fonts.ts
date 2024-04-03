import { Inter, Manrope, Sora, Major_Mono_Display } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-1",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-2",
});

const mono = Major_Mono_Display({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export { inter, manrope, sora, mono };
