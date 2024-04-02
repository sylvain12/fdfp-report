import { Inter, Manrope, Sora } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
});

export { inter, manrope, sora };
