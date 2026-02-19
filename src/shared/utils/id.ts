/**
 * Genera un UUID v4 usando crypto.randomUUID().
 * Disponibile in Node.js 19+ e nei browser moderni.
 */
export function generateId(): string {
  return crypto.randomUUID()
}
