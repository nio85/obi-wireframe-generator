import { useUiStore } from '@/store/ui.store'
import { VIEWPORTS, type ViewportKey } from '@shared/constants/viewport'
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Monitor,
  Smartphone,
  Save,
  Download,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function ViewportToggle() {
  const viewport = useUiStore((s) => s.viewport)
  const setViewport = useUiStore((s) => s.setViewport)

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted p-0.5">
      {(Object.keys(VIEWPORTS) as ViewportKey[]).map((key) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setViewport(key)}
              className={`rounded px-2 py-1 text-xs transition-colors ${
                viewport === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {key === 'desktop' ? (
                <Monitor className="h-4 w-4" />
              ) : (
                <Smartphone className="h-4 w-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {VIEWPORTS[key].label} ({VIEWPORTS[key].width}px)
            </p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

export function Toolbar() {
  const libraryPanelOpen = useUiStore((s) => s.libraryPanelOpen)
  const configPanelOpen = useUiStore((s) => s.configPanelOpen)
  const toggleLibraryPanel = useUiStore((s) => s.toggleLibraryPanel)
  const toggleConfigPanel = useUiStore((s) => s.toggleConfigPanel)

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-12 flex-shrink-0 items-center gap-2 border-b border-border bg-background px-3">
        {/* Left: Panel toggle + Project info */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleLibraryPanel}>
              {libraryPanelOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{libraryPanelOpen ? 'Nascondi libreria' : 'Mostra libreria'}</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Homepage</span>
          <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">v1</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            Bozza
          </span>
        </div>

        {/* Center: Viewport toggle */}
        <div className="flex flex-1 justify-center">
          <ViewportToggle />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <FolderOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Apri progetto</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Save className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Salva (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Esporta</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleConfigPanel}>
              {configPanelOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{configPanelOpen ? 'Nascondi configurazione' : 'Mostra configurazione'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
