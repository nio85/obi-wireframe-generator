import type { ComponentType } from 'react'
import { useCallback, useSyncExternalStore } from 'react'
import type { TemplateDefinition, TemplateCategory } from '@shared/types'
import type { TemplateRendererProps, RegistryEntry } from '../types/template.types'

interface ListFilter {
  category?: TemplateCategory
  isBuiltIn?: boolean
}

class TemplateRegistry {
  private entries = new Map<string, RegistryEntry>()
  private listeners = new Set<() => void>()
  private snapshot: TemplateDefinition[] = []

  register(definition: TemplateDefinition, renderer: ComponentType<TemplateRendererProps>): void {
    this.entries.set(definition.id, { definition, renderer })
    this.rebuildSnapshot()
    this.notify()
  }

  unregister(templateId: string): boolean {
    const entry = this.entries.get(templateId)
    if (!entry || entry.definition.isBuiltIn) return false
    this.entries.delete(templateId)
    this.rebuildSnapshot()
    this.notify()
    return true
  }

  getDefinition(templateId: string): TemplateDefinition | undefined {
    return this.entries.get(templateId)?.definition
  }

  getRenderer(templateId: string): ComponentType<TemplateRendererProps> | undefined {
    return this.entries.get(templateId)?.renderer
  }

  listDefinitions(filter?: ListFilter): TemplateDefinition[] {
    let results = this.snapshot
    if (filter?.category) {
      results = results.filter((d) => d.category === filter.category)
    }
    if (filter?.isBuiltIn !== undefined) {
      results = results.filter((d) => d.isBuiltIn === filter.isBuiltIn)
    }
    return results
  }

  getSnapshot(): TemplateDefinition[] {
    return this.snapshot
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify(): void {
    this.listeners.forEach((l) => l())
  }

  private rebuildSnapshot(): void {
    this.snapshot = Array.from(this.entries.values()).map((e) => e.definition)
  }
}

/** Global singleton template registry */
export const templateRegistry = new TemplateRegistry()

/** React hook to consume the template registry with automatic re-render on changes */
export function useTemplateRegistry() {
  const subscribe = useCallback(
    (cb: () => void) => templateRegistry.subscribe(cb),
    []
  )
  const getSnapshot = useCallback(() => templateRegistry.getSnapshot(), [])

  const definitions = useSyncExternalStore(subscribe, getSnapshot)

  return {
    definitions,
    getDefinition: (id: string) => templateRegistry.getDefinition(id),
    getRenderer: (id: string) => templateRegistry.getRenderer(id),
    listDefinitions: (filter?: ListFilter) => templateRegistry.listDefinitions(filter),
  }
}
