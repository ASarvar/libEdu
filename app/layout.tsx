import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/style-dark.css";
import "../public/css/responsive.css";
import Preloader from "@/components/elements/Preloader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Finclix - Business & Finance Consulting Next.js Template",
  description:
    "Finclix is a modern business and finance consulting template built with Next.js 15 and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${inter.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

