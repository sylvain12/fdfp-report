import {
  Inter,
  Manrope,
  Epilogue,
  Croissant_One,
  Sora,
} from "next/font/google";

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

const epilogue = Epilogue({
  subsets: ["latin"],
});

const fontserif = Croissant_One({
  weight: ["400"],
  subsets: ["latin"],
});

export { inter, manrope, epilogue, fontserif, sora };
