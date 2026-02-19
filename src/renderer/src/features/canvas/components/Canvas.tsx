import { useEffect, useRef } from 'react'
import { useUiStore } from '@/store/ui.store'
import { VIEWPORTS } from '@shared/constants/viewport'

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewport = useUiStore((s) => s.viewport)
  const zoom = useUiStore((s) => s.zoom)
  const setCanvasContainerWidth = useUiStore((s) => s.setCanvasContainerWidth)
  const canvasWidth = VIEWPORTS[viewport].width
  const scale = zoom / 100

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

          {/* Content area (drop zone) */}
          <div className="min-h-[400px] border-2 border-dashed border-gray-200 p-4">
            <div className="flex h-full flex-col items-center justify-center gap-2 py-20 text-center text-sm text-muted-foreground">
              <div className="rounded-full bg-muted p-4">
                <svg
                  className="h-8 w-8 text-muted-foreground/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <p className="font-medium">Trascina qui i componenti</p>
              <p className="text-xs text-muted-foreground/70">
                Seleziona un componente dalla libreria e trascinalo in questa area
              </p>
            </div>
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
