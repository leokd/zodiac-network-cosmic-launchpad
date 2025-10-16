import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProviderWrapper } from "@/components/WalletProviderWrapper";
import { Toaster } from "@/components/ui/sonner";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Zodiac Network - #1 & only Zodiac Network on Pump.Fun",
  description: "Trade 12 unique zodiac-themed tokens on Solana. Join your tribe now.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <WalletProviderWrapper>
          {children}
          <Toaster />
        </WalletProviderWrapper>
      </body>
    </html>
  );
}