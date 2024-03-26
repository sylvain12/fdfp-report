import { Inter, Manrope, Livvic } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

const oxygen = Livvic({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
});

export { inter, manrope, oxygen };
