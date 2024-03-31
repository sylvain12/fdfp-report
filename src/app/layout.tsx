import type { Metadata } from "next";
import { inter, manrope, epilogue } from "@/fonts";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
// import { Sidebar } from "@/components/sidebar/Sidebar";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={manrope.className}>
        <div className="main-container">
          {/* <div className="sidebar">
            <Sidebar />
          </div> */}
          <div className="main-navbar">
            <Navbar />
          </div>
          <div className="main-content">
            <CookiesProvider>{children}</CookiesProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
