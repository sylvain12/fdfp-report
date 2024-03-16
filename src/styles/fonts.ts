import { Inter, Quicksand, Roboto } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "400", "500"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500"],
});

export { inter, quicksand, roboto };
