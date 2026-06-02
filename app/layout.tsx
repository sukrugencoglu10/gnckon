import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "satılık konteyner", "yük konteyneri", "20 ft konteyner", "40 ft konteyner",
    "high cube konteyner", "reefer konteyner", "soğutuculu konteyner", "flat rack konteyner",
    "konteyner fiyatları", "ikinci el konteyner", "konteyner satın al", "konteyner sat",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.svg"],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.svg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.legalName,
    image: `${site.url}/og.svg`,
    url: site.url,
    telephone: site.phoneRaw,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressCountry: "TR",
    },
    openingHours: site.hours,
    priceRange: "₺₺",
    areaServed: "TR",
    sameAs: Object.values(site.social).filter(Boolean),
  };

  return (
    <html lang="tr" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileBottomBar />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
