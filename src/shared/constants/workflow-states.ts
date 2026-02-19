import type { WorkflowStatus } from '../types/workflow'

/** Regole di transizione (state machine) */
export const WORKFLOW_TRANSITIONS: Record<WorkflowStatus, WorkflowStatus[]> = {
  draft: ['in_review'],
  in_review: ['draft', 'approved'],
  approved: ['in_review', 'in_production'],
  in_production: ['draft']
}

/** Label italiane per gli stati */
export const WORKFLOW_LABELS: Record<WorkflowStatus, string> = {
  draft: 'Bozza',
  in_review: 'In Revisione',
  approved: 'Approvato',
  in_production: 'In Produzione'
}

/** Colori per badge stato */
export const WORKFLOW_COLORS: Record<WorkflowStatus, string> = {
  draft: 'gray',
  in_review: 'blue',
  approved: 'green',
  in_production: 'orange'
}
