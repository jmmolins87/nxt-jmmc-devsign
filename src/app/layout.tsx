import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
import { AnimationBootstrap } from "@/components/animations/animation-bootstrap";
import { Header } from "@/components/ui/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JMMC Devsign | Developer, Designer & AI Automation",
  description: "Diseño y desarrollo web con automatizaciones de IA, n8n, APIs y experiencias digitales de alto impacto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--night)] text-[var(--ink)]">
        <AnimationBootstrap />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
