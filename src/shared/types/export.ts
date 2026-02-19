// ═══════════════════════════════════════════
// Export types — metadati per export PNG/PDF
// ═══════════════════════════════════════════

import type { WorkflowStatus } from './workflow'
import type { Annotation } from './annotation'

export interface ExportMetadata {
  projectName: string
  versionName: string
  status: WorkflowStatus
  author: string
  date: string
  annotations?: Annotation[]
}
