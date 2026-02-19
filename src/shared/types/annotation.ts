// ═══════════════════════════════════════════
// Annotation types — commenti e annotazioni
// ═══════════════════════════════════════════

export interface Annotation {
  id: string
  componentId: string
  text: string
  author: string
  status: 'open' | 'resolved'
  position?: {
    xPercent: number
    yPercent: number
  }
  replies: AnnotationReply[]
  createdAt: string
  updatedAt: string
}

export interface AnnotationReply {
  id: string
  text: string
  author: string
  createdAt: string
}
