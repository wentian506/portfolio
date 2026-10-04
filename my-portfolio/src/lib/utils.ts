/** Tiny helper to join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const PLACEHOLDER = /your[-_]?(handle|username|github-username|name|email)|example\.com/i;

/**
 * True while a value is empty or still looks like template placeholder text
 * (e.g. "https://x.com/your_handle" or "you@example.com"). Such values are
 * hidden on the website automatically.
 */
export function isPlaceholder(value: string | undefined | null) {
  return !value || PLACEHOLDER.test(value);
}
