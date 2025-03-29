import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Queen Habesha - Ethiopian Hair Salon',
  description: 'Experience authentic Ethiopian hair care and styling at Queen Habesha. Specializing in traditional braiding, natural hair care, and modern styling techniques.',
  icons: {
    icon: [
      {
        url: '/images/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/favicon-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/images/favicon-96.png',
        sizes: '96x96',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/images/favicon-180.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    shortcut: [
      {
        url: '/images/favicon-196.png',
        sizes: '196x196',
        type: 'image/png',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} overflow-x-hidden relative w-full max-w-[100vw]`}>
        <div className="flex flex-col min-h-screen w-full overflow-hidden">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
