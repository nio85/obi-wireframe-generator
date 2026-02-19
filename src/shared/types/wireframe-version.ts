// ═══════════════════════════════════════════
// WireframeVersion — versione completa di un wireframe
// ═══════════════════════════════════════════

import type { WireframeComponent } from './component'
import type { WorkflowStatus, StatusTransition } from './workflow'
import type { Annotation } from './annotation'

/** Versione completa di un wireframe (caricata on-demand) */
export interface WireframeVersion {
  id: string
  projectId: string
  name: string
  description?: string

  // Contenuto
  components: WireframeComponent[]

  // Workflow
  status: WorkflowStatus
  statusHistory: StatusTransition[]

  // Annotazioni
  annotations: Annotation[]

  // Metadata
  createdAt: string
  createdBy: string
  updatedAt: string
  basedOnVersionId?: string
}
