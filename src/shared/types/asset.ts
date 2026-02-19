// ═══════════════════════════════════════════
// Asset types — immagini e file allegati
// ═══════════════════════════════════════════

export interface AssetReference {
  id: string
  filename: string
  originalName: string
  mimeType: string
  width?: number
  height?: number
  sizeBytes: number
}

export type AssetMap = Record<string, AssetReference>
