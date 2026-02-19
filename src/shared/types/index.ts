// ═══════════════════════════════════════════════════════════════
// OBI Wireframe Generator - Shared Types
// Tipi condivisi tra Main, Preload e Renderer process
// ═══════════════════════════════════════════════════════════════

// --- Wireframe Component Instance ---
export interface WireframeComponent {
  id: string
  templateId: string
  variant?: string
  config: Record<string, unknown>
  order: number
}

// --- Workflow Status ---
export type WorkflowStatus = 'draft' | 'in_review' | 'approved' | 'in_production'

// --- Status Transition ---
export interface StatusTransition {
  from: WorkflowStatus
  to: WorkflowStatus
  date: string
  author: string
  note: string
}

// --- Annotation ---
export interface Annotation {
  id: string
  componentId: string
  text: string
  author: string
  createdAt: string
  resolved: boolean
  position?: { x: number; y: number }
}

// --- Wireframe Version ---
export interface WireframeVersion {
  id: string
  name: string
  components: WireframeComponent[]
  status: WorkflowStatus
  statusHistory: StatusTransition[]
  annotations: Annotation[]
  createdAt: string
  createdBy: string
  updatedAt: string
}

// --- Project ---
export interface Project {
  id: string
  name: string
  description?: string
  versions: WireframeVersion[]
  customTemplates: TemplateDefinition[]
  createdAt: string
  updatedAt: string
}

// --- Project Summary (for listing) ---
export interface ProjectSummary {
  id: string
  name: string
  description?: string
  versionCount: number
  lastModified: string
}

// --- Config Field Types ---
export type ConfigFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'toggle'
  | 'image'
  | 'color'
  | 'datetime'

export interface ConfigField {
  key: string
  label: string
  type: ConfigFieldType
  required?: boolean
  defaultValue?: unknown
  options?: { label: string; value: string }[] // for select type
  placeholder?: string
  min?: number // for number type
  max?: number // for number type
}

// --- Template Definition ---
export interface TemplateDefinition {
  id: string
  name: string
  category: TemplateCategory
  icon: string
  description?: string
  cmsComponentId?: string
  cmsNotes?: string
  configSchema: ConfigField[]
  defaultConfig: Record<string, unknown>
}

// --- Template Category ---
export type TemplateCategory =
  | 'hero'
  | 'promo'
  | 'prodotti'
  | 'servizi'
  | 'editoriale'
  | 'navigazione'
  | 'cta'
  | 'custom'

// --- Asset Reference ---
export interface AssetReference {
  id: string
  filename: string
  originalName: string
  mimeType: string
  width?: number
  height?: number
}

// --- Asset Map ---
export type AssetMap = Record<string, AssetReference>

// --- Export Metadata ---
export interface ExportMetadata {
  projectName: string
  versionName: string
  status: WorkflowStatus
  author: string
  date: string
  annotations?: Annotation[]
}

// --- Viewport ---
export type Viewport = 'desktop' | 'mobile'

export const VIEWPORT_WIDTHS: Record<Viewport, number> = {
  desktop: 1440,
  mobile: 375
}
