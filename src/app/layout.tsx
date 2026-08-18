import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollProgress from "@/components/animations/ScrollProgress";
import SmoothScroll from "@/components/providers/SmoothScroll";
import EasterEggs from "@/components/ui/EasterEggs";
import DeviceTierGate from "@/components/three/DeviceTierGate";
import ScrollSyncBridge from "@/components/three/ScrollSyncBridge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pooja Kiran Bharadwaj | AI Security Engineer",
  description:
    "AI Security Engineer specializing in adversarial robustness, LLM safety, secure ML pipelines, and trustworthy AI systems. Building the Guardian Protocol for intelligent system defense.",
  keywords: [
    "AI Security",
    "Machine Learning Security",
    "LLM Safety",
    "Adversarial Robustness",
    "Trustworthy AI",
    "ML Pipeline Security",
    "AI Engineer",
    "Pooja Kiran Bharadwaj",
  ],
  authors: [{ name: "Pooja Kiran Bharadwaj" }],
  creator: "Pooja Kiran Bharadwaj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://poojakiran.dev",
    title: "Pooja Kiran Bharadwaj | AI Security Engineer",
    description:
      "Engineering Trust in Intelligent Systems. AI Security Engineer specializing in adversarial robustness, LLM safety, and secure ML pipelines.",
    siteName: "Pooja Kiran Bharadwaj Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran Bharadwaj | AI Security Engineer",
    description:
      "Engineering Trust in Intelligent Systems. AI Security Engineer specializing in adversarial robustness, LLM safety, and secure ML pipelines.",
    creator: "@poojakiran",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pooja Kiran Bharadwaj",
  jobTitle: "AI Security Engineer",
  description:
    "AI Security Engineer specializing in adversarial robustness, LLM safety, and trustworthy AI systems.",
  knowsAbout: [
    "Artificial Intelligence Security",
    "Machine Learning",
    "LLM Safety",
    "Adversarial Robustness",
    "Secure ML Pipelines",
    "Trustworthy AI",
    "Deep Learning",
    "Cloud Security",
  ],
  sameAs: [
    "https://linkedin.com/in/poojakiran",
    "https://github.com/poojakira",
  ],
  url: "https://poojakiran.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-deep-space text-pure-light font-inter antialiased">
        <EasterEggs />
        <DeviceTierGate />
        <ScrollSyncBridge />
        <CustomCursor />
        <ScrollProgress />
        <Header />
        <SmoothScroll>
          <main id="main-content" className="relative" style={{ zIndex: 1 }}>{children}</main>
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
