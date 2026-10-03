import type { Metadata, Viewport } from "next";
import "./globals.css";
import { resume } from "@/data/resume";

const siteUrl = "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pooja Kiran | Security Engineer",
  description: "Pooja Kiran builds security controls across AI agents, cloud identity, model supply chains, training-data integrity, and detection engineering.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Pooja Kiran | Security Engineer",
    description: "I engineer trust boundaries for systems that can act.",
    url: siteUrl,
    siteName: "Pooja Kiran Security Engineering Portfolio",
    type: "website",
    images: [{ url: "/Pooja_Kiran_Portfolio_Website/og-card.png", width: 1200, height: 630, alt: "Pooja Kiran, Security Engineer" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran | Security Engineer",
    description: "AI & Agent Security · Cloud IAM · Model Supply Chain · Training-Data Integrity",
    images: ["/Pooja_Kiran_Portfolio_Website/og-card.png"]
  },
  icons: { icon: "/Pooja_Kiran_Portfolio_Website/favicon.svg" }
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
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Arizona State University" },
      { "@type": "CollegeOrUniversity", name: "M. S. Ramaiah University of Applied Sciences" }
    ]
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
