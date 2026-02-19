/** Restituisce un timestamp ISO 8601 corrente */
export function nowISO(): string {
  return new Date().toISOString()
}

/** Formatta una data ISO in formato italiano leggibile: "19 feb 2026, 14:30" */
export function formatDateIT(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/** Formatta una data ISO in formato compatto: "19/02/2026" */
export function formatDateShort(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('it-IT')
}
