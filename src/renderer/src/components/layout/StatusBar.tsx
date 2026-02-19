import { useUiStore } from '@/store/ui.store'
import { VIEWPORTS } from '@shared/constants/viewport'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function StatusBar() {
  const zoom = useUiStore((s) => s.zoom)
  const fitZoom = useUiStore((s) => s.fitZoom)
  const setZoom = useUiStore((s) => s.setZoom)
  const viewport = useUiStore((s) => s.viewport)

  const isAtFit = zoom >= fitZoom

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-7 flex-shrink-0 items-center justify-between border-t border-border bg-muted/50 px-3 text-xs text-muted-foreground">
        {/* Left: save status */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Salvato
          </span>
        </div>

        {/* Center: viewport info */}
        <div className="flex items-center gap-2">
          <span>
            {VIEWPORTS[viewport].label} — {VIEWPORTS[viewport].width}px
          </span>
        </div>

        {/* Right: zoom */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setZoom(zoom - 10)}
                disabled={zoom <= 25}
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Riduci zoom</p>
            </TooltipContent>
          </Tooltip>

          <button
            className="w-10 text-center hover:text-foreground"
            onClick={() => setZoom(fitZoom)}
            title="Adatta alla larghezza"
          >
            {zoom}%
          </button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setZoom(zoom + 10)}
                disabled={isAtFit}
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isAtFit ? 'Zoom massimo (adattato)' : 'Aumenta zoom'}</p>
            </TooltipContent>
          </Tooltip>

        </div>
      </div>
    </TooltipProvider>
  )
}
