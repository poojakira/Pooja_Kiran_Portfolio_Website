export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-slate focus:px-4 focus:py-2 focus:text-fluid-sm focus:text-chalk"
    >
      Skip to content
    </a>
  );
}
