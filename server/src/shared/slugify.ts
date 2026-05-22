/**
 * Turn a human label into a URL-safe slug.
 * Falls back to "item" when the input has no slug-able characters.
 */
export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'item';
}
