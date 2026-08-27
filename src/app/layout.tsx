import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  title: "Pooja Kiran Bharadwaj | Security Engineer",
  description:
    "Security Engineer focused on detection engineering, security automation, cloud/IAM security, and AI system security. Builds and tests security controls with measurable evidence.",
  keywords: [
    "Security Engineer",
    "Detection Engineering",
    "Detection and Response",
    "Cloud Security",
    "AWS IAM",
    "Kubernetes Security",
    "AI Security",
    "MITRE ATT&CK",
    "Pooja Kiran Bharadwaj",
  ],
  authors: [{ name: "Pooja Kiran Bharadwaj" }],
  creator: "Pooja Kiran Bharadwaj",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://poojakiran.dev",
    title: "Pooja Kiran Bharadwaj | Security Engineer",
    description:
      "Security Engineer focused on detection engineering, security automation, cloud/IAM security, and AI system security.",
    siteName: "Pooja Kiran Bharadwaj",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran Bharadwaj | Security Engineer",
    description:
      "Security Engineer focused on detection engineering, security automation, and AI system security.",
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
  jobTitle: "Security Engineer",
  description:
    "Security Engineer focused on detection engineering, security automation, cloud/IAM security, and AI system security.",
  knowsAbout: [
    "Detection Engineering",
    "Security Automation",
    "Cloud Security",
    "AWS IAM",
    "Kubernetes",
    "MITRE ATT&CK",
    "AI Security",
    "Threat Modeling",
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
        <Header />
        <main id="main-content" className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
