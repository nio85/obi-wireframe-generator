import { useEffect, useMemo, useRef, useState } from 'react'
import { useUiStore } from '@/store/ui.store'
import { VIEWPORTS } from '@shared/constants/viewport'
import { templateRegistry } from '@/features/templates/registry/template.registry'
import type { WireframeComponent } from '@shared/types'
import type { TemplateRendererProps } from '@/features/templates/types/template.types'
import type { ComponentType } from 'react'

function createDemoComponents(): WireframeComponent[] {
  return [
    {
      id: 'demo-1',
      templateId: 'hero-slider',
      config: { ...templateRegistry.getDefinition('hero-slider')?.defaultConfig },
      order: 0,
      isVisible: true,
      isLocked: false,
      annotationIds: [],
    },
    {
      id: 'demo-2',
      templateId: 'teaser-image-text',
      config: { ...templateRegistry.getDefinition('teaser-image-text')?.defaultConfig },
      order: 1,
      isVisible: true,
      isLocked: false,
      annotationIds: [],
    },
    {
      id: 'demo-3',
      templateId: 'teaser-image',
      config: { ...templateRegistry.getDefinition('teaser-image')?.defaultConfig },
      order: 2,
      isVisible: true,
      isLocked: false,
      annotationIds: [],
    },
    {
      id: 'demo-4',
      templateId: 'grid-promo',
      config: { ...templateRegistry.getDefinition('grid-promo')?.defaultConfig },
      order: 3,
      isVisible: true,
      isLocked: false,
      annotationIds: [],
    },
  ]
}

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewport = useUiStore((s) => s.viewport)
  const zoom = useUiStore((s) => s.zoom)
  const setCanvasContainerWidth = useUiStore((s) => s.setCanvasContainerWidth)
  const canvasWidth = VIEWPORTS[viewport].width
  const scale = zoom / 100

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const demoComponents = useMemo(() => createDemoComponents(), [])

  // Misura il container con ResizeObserver per l'auto-fit
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setCanvasContainerWidth(entries[0].contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [setCanvasContainerWidth])

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden bg-muted/30"
    >
      <div className="flex justify-center p-6">
        {/*
          CSS zoom: scala sia il rendering che il layout space.
          A differenza di transform: scale(), il browser ricalcola il box model,
          quindi il contenitore padre vede la dimensione reale scalata.
        */}
        <div
          className="relative bg-white shadow-md"
          style={{
            width: canvasWidth,
            zoom: scale
          }}
        >
          {/* OBI Header (decorativo) */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-12 items-center justify-center rounded bg-obi-orange text-xs font-bold text-white">
                OBI
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Giardino</span>
                <span>Bagno</span>
                <span>Pittura</span>
                <span>Illuminazione</span>
                <span>Edilizia</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>Account</span>
              <span>Carrello</span>
            </div>
          </div>

          {/* Content area — demo dei 4 renderer (Sprint 1.2) */}
          <div className="min-h-[400px]">
            {demoComponents.map((comp) => {
              const def = templateRegistry.getDefinition(comp.templateId)
              const Renderer = templateRegistry.getRenderer(comp.templateId) as
                | ComponentType<TemplateRendererProps>
                | undefined
              if (!def || !Renderer) return null
              return (
                <div
                  key={comp.id}
                  onClick={() =>
                    setSelectedId(comp.id === selectedId ? null : comp.id)
                  }
                  className="cursor-pointer"
                >
                  <Renderer
                    component={comp}
                    template={def}
                    viewport={viewport}
                    isSelected={comp.id === selectedId}
                  />
                </div>
              )
            })}
          </div>

          {/* OBI Footer (decorativo) */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-between text-xs text-gray-400">
              <div className="flex gap-4">
                <span>Chi siamo</span>
                <span>Negozi</span>
                <span>Servizi</span>
                <span>Assistenza</span>
              </div>
              <span>&copy; OBI Italia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
