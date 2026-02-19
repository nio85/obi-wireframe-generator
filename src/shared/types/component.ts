// ═══════════════════════════════════════════
// Component types — istanza componente nel wireframe
// ═══════════════════════════════════════════

/** Istanza di un componente nel wireframe */
export interface WireframeComponent {
  id: string
  templateId: string
  variant?: string
  config: Record<string, unknown>
  order: number

  // Metadata istanza
  label?: string
  isVisible: boolean
  isLocked: boolean

  // Annotazioni collegate
  annotationIds: string[]
}
