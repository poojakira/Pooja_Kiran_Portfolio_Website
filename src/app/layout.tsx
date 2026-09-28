import type { Metadata } from "next";
import "./globals.css";
import { resume } from "@/data/resume";

const siteUrl = "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${resume.name} | ${resume.headline}`,
  description: "Security engineering portfolio focused on agentic AI security, cloud IAM, application and identity security, model supply-chain security, and detection engineering.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: `${resume.name} | ${resume.headline}`,
    description: "Agentic AI security, AWS IAM, model supply-chain security, application security, and detection engineering.",
    url: siteUrl,
    siteName: "Pooja Kiran Portfolio",
    type: "website",
    images: [{ url: "/Pooja_Kiran_Portfolio_Website/og-card.svg", width: 1200, height: 630, alt: "Pooja Kiran security engineering portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${resume.name} | ${resume.headline}`,
    description: "Security Engineer | Agentic AI Security | Cloud IAM",
    images: ["/Pooja_Kiran_Portfolio_Website/og-card.svg"]
  },
  icons: { icon: "/Pooja_Kiran_Portfolio_Website/favicon.svg" }
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
    address: { "@type": "PostalAddress", addressLocality: "Tempe", addressRegion: "AZ" }
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
