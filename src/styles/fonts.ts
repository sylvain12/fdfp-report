import { Inter, Manrope, Sora, Major_Mono_Display } from "next/font/google";
import localFont from 'next/font/local';

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

const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/display/ClashDisplay-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/display/ClashDisplay-Regular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/display/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/display/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
});


export { inter, manrope, sora, mono, clashDisplay };
