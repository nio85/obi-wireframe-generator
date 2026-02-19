import type { ComponentType } from 'react'
import type { WireframeComponent, TemplateDefinition } from '@shared/types'

/** Props passed to every template renderer component */
export interface TemplateRendererProps {
  component: WireframeComponent
  template: TemplateDefinition
  viewport: 'desktop' | 'mobile'
  isSelected: boolean
  isPreview?: boolean
}

/** Internal registry entry pairing a definition with its renderer */
export interface RegistryEntry {
  definition: TemplateDefinition
  renderer: ComponentType<TemplateRendererProps>
}
