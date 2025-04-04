import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import getHeader from "@/lib/queries/getHeader";
import getFooter from "@/lib/queries/getFooter";
import Header from "@/components/Header";
import Footer from '@/components/Footer';
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeader();
  const footerData = await getFooter();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1592px] mx-auto px-6`}
      >
        <Toaster position="top-right" />
        <Header menu={headerData.menu} />
        {children}
        <Footer menu={footerData.menu} />
      </body>
    </html>
  );
}
