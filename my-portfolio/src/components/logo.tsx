/** The little "lens" logo in the navbar. Swap it for your initials if you like. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12.5" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="10.5" r="2.5" fill="currentColor" />
    </svg>
  );
}
