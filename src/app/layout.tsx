import type { Metadata, Viewport } from "next";
import "./globals.css";
import { resume } from "@/data/resume";

const siteUrl = "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website";
const socialImage = `${siteUrl}/pooja-portrait.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Pooja Kiran | Software Engineer | AI Agents & Application Security",
  description: "Software engineer building Python-based AI-agent authorization, application-security and cloud IAM review tools, with source-linked tests and documented limitations.",
  alternates: { canonical: `${siteUrl}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  manifest: `${siteUrl}/site.webmanifest`,
  openGraph: {
    title: "Pooja Kiran | Software Engineer | AI Agents & Application Security",
    description: "Python engineering projects spanning MCP authorization, AWS IAM analysis, model-artifact inspection, and FastAPI investigations.",
    url: `${siteUrl}/`,
    siteName: "Pooja Kiran | Software Engineer | AI Agents & Application Security",
    type: "website",
    images: [{ url: socialImage, alt: "Pooja Kiran" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran | Software Engineer | AI Agents & Application Security",
    description: "AI-agent authorization · Application security · Python engineering",
    images: [socialImage]
  },
  icons: { icon: `${siteUrl}/favicon.svg` }
};

export const viewport: Viewport = {
  themeColor: "#05080c",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.name,
    description: resume.positioning,
    email: `mailto:${resume.email}`,
    url: resume.links.portfolio,
    sameAs: [resume.links.linkedin, resume.links.github],
    knowsAbout: ["AI Security", "Agent Security", "Application Security", "Cloud IAM Security", "Model Supply-Chain Security", "Security Automation"],
    alumniOf: resume.education.map(item => ({ "@type": "CollegeOrUniversity", name: item.school }))
  };

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; img-src 'self' data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        {children}
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </body>
    </html>
  );
}

