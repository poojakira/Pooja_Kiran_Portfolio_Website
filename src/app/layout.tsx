import type { Metadata, Viewport } from "next";
import "./globals.css";
import { resume } from "@/data/resume";

const siteUrl = "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website";
const socialImage = `${siteUrl}/pooja-portrait.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "Pooja Kiran | Technical Program Manager | Security & AI Systems",
  description: "Technical Program Manager with software, cloud, API delivery, security engineering and AI-agent security experience.",
  alternates: { canonical: `${siteUrl}/` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  manifest: `${siteUrl}/site.webmanifest`,
  openGraph: {
    title: "Pooja Kiran | Technical Program Manager | Security & AI Systems",
    description: "Technical Program Manager with software, cloud, API delivery, security engineering and AI-agent security experience.",
    url: `${siteUrl}/`,
    siteName: "Pooja Kiran | Technical Program Manager | Security & AI Systems",
    type: "website",
    images: [{ url: socialImage, alt: "Pooja Kiran" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Kiran | Technical Program Manager | Security & AI Systems",
    description: "Technical Program Manager with software, cloud, API delivery, security engineering and AI-agent security experience.",
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
    jobTitle: resume.headline,
    description: resume.positioning,
    email: `mailto:${resume.email}`,
    url: resume.links.portfolio,
    sameAs: [resume.links.linkedin, resume.links.github],
    knowsAbout: ["Technical Program Management", "Agile", "API Security", "Threat Modeling", "AI Agent Security"],
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

