import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "../public/css/bootstrap.min.css";
import "../public/css/style.css";
import "../public/css/style-dark.css";
import "../public/css/responsive.css";
import Preloader from "@/components/elements/Preloader";
import I18nProvider from "@/components/providers/I18nProvider";

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
  title: "Respublika Kutubxonalari Yagona Veb Platformasi",
  description:
    "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" data-scroll-behavior="smooth" className={`${dmSans.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <I18nProvider>
          <Preloader />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

