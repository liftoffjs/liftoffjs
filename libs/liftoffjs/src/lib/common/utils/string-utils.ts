export function isNullOrWhitespace(str: string) {
  return !str?.trim()?.length;
}