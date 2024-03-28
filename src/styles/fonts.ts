import { Inter, Manrope, Epilogue, Croissant_One } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

const fontserif = Croissant_One({
  weight: ["400"],
  subsets: ["latin"],
});

export { inter, manrope, epilogue, fontserif };
