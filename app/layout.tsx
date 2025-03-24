import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Providers from "./providers";
import Footer from "@/components/general/Footer";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sky Connect - Airport Information",
  description:
    "Browse and search airports worldwide with detailed information and maps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pattern`}
      >
        <ThemeProvider>
          <Providers>
            <ResponsiveNav />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
