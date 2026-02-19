/** Verifica che una stringa non sia vuota (dopo trim) */
export function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** Sanitizza un nome file rimuovendo caratteri non sicuri */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^\.+/, '')
    .slice(0, 200)
}

/** Verifica che un path sia relativo e non tenti path traversal */
export function isSafePath(path: string): boolean {
  const normalized = path.replace(/\\/g, '/')
  return (
    !normalized.startsWith('/') &&
    !normalized.startsWith('..') &&
    !normalized.includes('/../') &&
    !normalized.includes('\\..\\') &&
    !/^[a-zA-Z]:/.test(normalized)
  )
}
