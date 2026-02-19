// ═══════════════════════════════════════════
// Template types — definizioni e configurazione template
// ═══════════════════════════════════════════

/** Tipo di campo configurabile in un template */
export type ConfigFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'toggle'
  | 'image'
  | 'datetime'
  | 'color'
  | 'slider'
  | 'group'

/** Definizione di un campo configurabile */
export interface ConfigField {
  key: string
  type: ConfigFieldType
  label: string
  description?: string
  placeholder?: string
  required?: boolean
  defaultValue?: unknown

  // Validazione
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
  }

  // Per type: 'select'
  options?: Array<{
    value: string
    label: string
  }>

  // Per type: 'group' (nested fields)
  children?: ConfigField[]

  // Per type: 'image'
  imageConstraints?: {
    aspectRatio?: string
    minWidth?: number
    minHeight?: number
    maxFileSizeMB?: number
  }

  // Visibilita condizionale
  showWhen?: {
    field: string
    equals: unknown
  }

  // Mapping CMS
  cmsFieldName?: string
}

/** Categoria di template */
export type TemplateCategory =
  | 'hero'
  | 'promo'
  | 'prodotti'
  | 'servizi'
  | 'editoriale'
  | 'navigazione'
  | 'cta'
  | 'utility'
  | 'custom'

/** Definizione completa di un template */
export interface TemplateDefinition {
  id: string
  name: string
  description?: string
  category: TemplateCategory
  icon: string
  thumbnail?: string

  // Schema configurazione
  configSchema: ConfigField[]
  defaultConfig: Record<string, unknown>

  // Varianti
  variants?: Array<{
    id: string
    name: string
    description?: string
    defaultConfig?: Record<string, unknown>
  }>

  // Layout interno
  layout: {
    desktop: {
      minHeight: number
      maxHeight?: number
      columns?: number
      gap?: number
      padding?: string
    }
    mobile: {
      minHeight: number
      stackDirection?: 'vertical' | 'horizontal'
      padding?: string
    }
  }

  // Mapping CMS Magnolia
  cms?: {
    componentId: string
    areaName?: string
    notes?: string
    documentationUrl?: string
  }

  // Metadata
  isBuiltIn: boolean
  version: number
  createdAt?: string
  updatedAt?: string

  // Per template custom: definizione zone
  customZones?: TemplateZone[]
}

/** Zona all'interno di un template custom */
export interface TemplateZone {
  id: string
  type: 'image' | 'text' | 'heading' | 'cta' | 'icon' | 'countdown' | 'spacer'
  label: string

  position: {
    column: number
    columnSpan: number
    row: number
    rowSpan: number
  }

  style?: {
    alignment?: 'left' | 'center' | 'right'
    verticalAlignment?: 'top' | 'middle' | 'bottom'
    backgroundColor?: string
    textColor?: string
    fontSize?: 'sm' | 'md' | 'lg' | 'xl'
    fontWeight?: 'normal' | 'bold'
    padding?: string
    borderRadius?: string
  }
}
