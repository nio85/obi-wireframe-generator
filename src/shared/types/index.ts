// ═══════════════════════════════════════════
// Barrel export — tutti i tipi shared
// ═══════════════════════════════════════════

export type {
  ConfigFieldType,
  ConfigField,
  TemplateCategory,
  TemplateDefinition,
  TemplateZone
} from './template'

export type { WireframeComponent } from './component'

export type { WorkflowStatus, StatusTransition } from './workflow'

export type { Annotation, AnnotationReply } from './annotation'

export type { AssetReference, AssetMap } from './asset'

export type { WireframeVersion } from './wireframe-version'

export type {
  ProjectSummary,
  VersionSummary,
  Project,
  ProjectSettings
} from './project'

export type { ExportMetadata } from './export'

export type {
  ElectronAPI,
  OpenDialogOptions,
  SaveDialogOptions,
  MessageDialogOptions
} from './api'
