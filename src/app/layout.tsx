import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/constants";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const gaId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || SITE.gaMeasurementId;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "kprompt.ai — Talk to Your Cluster",
    template: "%s · kprompt.ai",
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
  keywords: [
    "Kubernetes",
    "AI CLI",
    "natural language",
    "kubectl",
    "platform engineering",
    "SRE",
    "open source",
    "plan approve apply",
    "DevOps",
  ],
  authors: [{ name: "kprompt" }],
  creator: "kprompt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "kprompt.ai — Talk to Your Cluster",
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "kprompt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "kprompt.ai — Talk to Your Cluster",
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        <JsonLd />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrains.variable} min-h-screen font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
