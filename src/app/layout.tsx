import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import SkipLink from "@/components/ui/SkipLink";

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
  title: "Pooja Kiran · Security Engineer | AI Security | Security Architecture",
  description:
    "Security Engineer with 2+ years of experience in AI security, detection engineering, and cloud security. Building open-source controls for agentic AI, MCP toolchains, AWS IAM, and model supply-chain risks.",
  keywords: [
    "Security Engineer",
    "AI Security",
    "Security Architecture",
    "Agentic AI Security",
    "MCP Security",
    "Detection Engineering",
    "AWS IAM",
    "Model Supply-Chain Security",
    "LLM Security",
    "Adversarial ML",
    "MITRE ATT&CK",
    "MITRE ATLAS",
    "Pooja Kiran",
  ],
  authors: [{ name: "Pooja Kiran" }],
  creator: "Pooja Kiran",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Pooja Kiran · Security Engineer | AI Security | Security Architecture",
    description:
      "Open-source security tooling for the boundary where AI agents, tools, identities, and model artifacts meet.",
    siteName: "Pooja Kiran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran · Security Engineer | AI Security | Security Architecture",
    description:
      "Security Engineer building controls for agentic AI: MCP, AWS IAM, and model supply-chain.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pooja Kiran",
  jobTitle: "Security Engineer",
  description:
    "Security Engineer with 2+ years of experience in AI security, detection engineering, and cloud security. Building open-source controls for agentic AI, MCP toolchains, AWS IAM, and model supply-chain risks.",
  knowsAbout: [
    "AI Security",
    "Security Architecture",
    "Agentic AI Security",
    "MCP / Tool Security",
    "Detection Engineering",
    "AWS IAM & Least Privilege",
    "Model Supply-Chain Security",
    "Adversarial ML",
    "LLM Red-Teaming",
    "MITRE ATT&CK",
    "MITRE ATLAS",
  ],
  sameAs: [
    "https://github.com/poojakira",
    "https://www.linkedin.com/in/poojakiran/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-chalk font-sans antialiased">
        <SkipLink />
        <SmoothScroll>
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
