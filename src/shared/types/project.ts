// ═══════════════════════════════════════════
// Project types — progetto e sommario
// ═══════════════════════════════════════════

import type { WorkflowStatus } from './workflow'
import type { TemplateDefinition } from './template'

/** Sintesi progetto (per lista progetti, senza dati pesanti) */
export interface ProjectSummary {
  id: string
  name: string
  description?: string
  versionsCount: number
  latestVersionName?: string
  latestVersionStatus?: WorkflowStatus
  updatedAt: string
  createdAt: string
}

/** Sommario di una versione dentro il progetto */
export interface VersionSummary {
  id: string
  name: string
  status: WorkflowStatus
  createdAt: string
  createdBy: string
  updatedAt: string
  componentCount: number
}

/** Progetto completo */
export interface Project {
  id: string
  name: string
  description?: string

  // Versioni (caricate on-demand)
  versions: VersionSummary[]
  currentVersionId?: string

  // Template custom del progetto
  customTemplates: TemplateDefinition[]

  // Settings
  settings: ProjectSettings

  // Metadata
  createdAt: string
  createdBy: string
  updatedAt: string
  appVersion: string
  schemaVersion: number
}

export interface ProjectSettings {
  defaultViewport: 'desktop' | 'mobile'
  autoSaveInterval: number
  storagePath?: string
}
