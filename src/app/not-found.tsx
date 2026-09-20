import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 / Page not found</p>
      <h1>This page isn&apos;t here.</h1>
      <p>The link may be outdated. You can find my work and current résumé on the homepage.</p>
      <Link href="/" className="button button-dark">Return to portfolio</Link>
    </div>
  );
}
