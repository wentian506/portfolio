import { BackLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-subtle">404</p>
      <h1 className="mt-2 font-display text-5xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">This page wandered off. Let&apos;s get you back home.</p>
      <BackLink />
    </div>
  );
}
