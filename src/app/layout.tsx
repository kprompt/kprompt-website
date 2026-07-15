import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SITE } from "@/lib/constants";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "kprompt.ai — Talk to Your Cluster",
    template: "%s · kprompt.ai",
  },
  description: SITE.description,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
  keywords: [
    "Kubernetes",
    "AI",
    "natural language",
    "kubectl",
    "Helm",
    "Argo Workflows",
    "open source",
    "DevOps",
    "platform engineering",
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
    <html lang="en">
      <body
        className={`${sora.variable} ${jetbrains.variable} min-h-screen font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
