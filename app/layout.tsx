
import type { Metadata } from "next";
import {
  Geist,
  Noto_Sans_KR,
  Source_Serif_4,
} from "next/font/google";

import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "English PDF Store",
  description:
    "Combo, Combo Junior, Coreset 영어 PDF 교재 판매",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`
          ${geistSans.variable}
          ${notoSansKr.variable}
          ${sourceSerif.variable}
          min-h-screen
          bg-[#5E813F]
        `}
      >
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}



