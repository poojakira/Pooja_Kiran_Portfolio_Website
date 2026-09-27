import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"),
  title: "Pooja Kiran | AI Security Engineer",
  description:
    "Pooja Kiran — Security Engineer building controls for AI agents, cloud identities, applications, data, and model artifacts. AI Security, Application Security, Cloud & IAM, Agent/MCP Security.",
  keywords: [
    "Security Engineer", "AI Security", "Application Security", "Cloud Security",
    "IAM", "Agent Security", "MCP", "Prompt Injection", "Model Supply-Chain Security",
    "Adversarial ML", "LLM Security", "Pooja Kiran",
  ],
  authors: [{ name: "Pooja Kiran" }],
  openGraph: {
    title: "Pooja Kiran | AI Security Engineer",
    description: "TRUST // LAB — Securing AI from artifact to action.",
    type: "website",
    images: [{ url: profile.photo, width: 512, height: 512, alt: "Pooja Kiran" }],
  },
  twitter: { card: "summary", title: "Pooja Kiran | AI Security Engineer" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
