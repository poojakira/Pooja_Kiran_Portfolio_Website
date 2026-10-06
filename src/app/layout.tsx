import type { Metadata, Viewport } from "next";
import "./globals.css";
import { resume } from "@/data/resume";

const siteUrl = "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website";
const socialImage = `${siteUrl}/og-card.png`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Pooja Kiran | AI Security & Security Engineer",
  description: "Pooja Kiran is a Security Engineer specializing in AI & Agent Security, Application Security, Cloud IAM Security, Model Supply-Chain Security, and Security Automation.",
  alternates: { canonical: `${siteUrl}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  manifest: `${siteUrl}/site.webmanifest`,
  openGraph: {
    title: "Pooja Kiran | AI Security & Security Engineer",
    description: "Security Engineer specializing in AI & Agent Security, Application Security, Cloud IAM Security, Model Supply-Chain Security, and Security Automation.",
    url: `${siteUrl}/`,
    siteName: "Pooja Kiran Security Engineering Portfolio",
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Pooja Kiran, Security Engineer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran | AI Security & Security Engineer",
    description: "AI & Agent Security · Application Security · Cloud IAM Security · Model Supply-Chain Security · Security Automation",
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
    jobTitle: "Security Engineer",
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

