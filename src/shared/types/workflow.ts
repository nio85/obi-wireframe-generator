// ═══════════════════════════════════════════
// Workflow types — stati e transizioni
// ═══════════════════════════════════════════

export type WorkflowStatus = 'draft' | 'in_review' | 'approved' | 'in_production'

export interface StatusTransition {
  id: string
  from: WorkflowStatus
  to: WorkflowStatus
  note: string
  author: string
  timestamp: string
}
