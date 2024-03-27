import { Inter, Manrope, Livvic, Epilogue } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

const oxygen = Epilogue({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export { inter, manrope, oxygen };
