import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Script from "next/script";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { WhatsAppFloat } from "@/components/dom/WhatsAppFloat";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Agrofort — Tradição viva de Januária",
    template: "%s | Agrofort",
  },
  description: "Queijos artesanais, biscoitos e pão de queijo feitos na Fazenda Barra Funda, em Januária, Norte de Minas.",
  keywords: ["Agrofort", "queijo artesanal", "Januária", "Norte de Minas", "pão de queijo", "Fazenda Barra Funda"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Fazenda Agrofort",
    title: "Agrofort — Tradição viva de Januária",
    description: "Do pasto à mesa, cuidado verdadeiro em cada pedaço.",
    images: [{ url: "/og-optimized.jpg", width: 1200, height: 630, alt: "Agrofort — Tradição viva de Januária" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrofort — Tradição viva de Januária",
    description: "Queijos artesanais e pão de queijo do Norte de Minas.",
    images: ["/og-optimized.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#073e2a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Ir para o conteúdo principal</a>
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});(function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        <MotionProvider />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
