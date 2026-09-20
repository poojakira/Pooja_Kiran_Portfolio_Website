import type { Metadata } from "next";
import localFont from "next/font/local";
import "./portfolio.css";
import PortfolioHeader from "@/components/layout/PortfolioHeader";
import { profile, SITE_PATH } from "@/data/portfolio";

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist", display: "swap", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", display: "swap", weight: "100 900" });
const description = "Pooja Kiran, Security Engineer. Open-source engineering across AI agents, AWS IAM, model supply chains, and detection workflows.";
export const metadata: Metadata = {
  metadataBase: new URL("https://poojakira.github.io"),
  title: "Pooja Kiran | Security Engineer",
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: SITE_PATH + "/" },
  icons: { icon: SITE_PATH + "/favicon.svg" },
  openGraph: { type: "website", locale: "en_US", title: "Pooja Kiran | Security Engineer", description, siteName: "Pooja Kiran", url: SITE_PATH + "/" },
  twitter: { card: "summary", title: "Pooja Kiran | Security Engineer", description },
  robots: { index: true, follow: true },
};
const personSchema = {
  "@context": "https://schema.org", "@type": "Person", name: profile.name,
  jobTitle: profile.title, url: "https://poojakira.github.io" + SITE_PATH + "/",
  sameAs: [profile.github, profile.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Arizona State University" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable + " " + geistMono.variable}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} /></head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <PortfolioHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="site-footer"><div className="container footer-inner"><p>© 2026 Pooja Kiran · Security Engineer</p><a href={SITE_PATH + "/#main-content"}>Back to top ↑</a></div></footer>
      </body>
    </html>
  );
}
