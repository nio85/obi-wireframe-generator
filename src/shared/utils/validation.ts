/** Verifica che una stringa non sia vuota (dopo trim) */
export function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** Sanitizza un nome file rimuovendo caratteri non sicuri */
export function sanitizeFilename(name: string): string {
  const sanitized = name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^\.+/, '')
    .slice(0, 200)
  return sanitized || 'untitled'
}

/** Verifica che un path sia relativo e non tenti path traversal */
export function isSafePath(path: string): boolean {
  if (!path || path.trim().length === 0) return false
  const normalized = path.replace(/\\/g, '/')
  // Split into segments and check each one
  const segments = normalized.split('/')
  return (
    !normalized.startsWith('/') &&
    !/^[a-zA-Z]:/.test(normalized) &&
    segments.every((seg) => seg !== '..')
  )
}
