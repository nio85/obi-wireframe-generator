import { Settings2 } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ConfigPanel() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border px-3 py-2">
        <h2 className="text-sm font-semibold text-foreground">Configurazione</h2>
      </div>

      {/* Empty state */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Settings2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Nessun componente selezionato</p>
            <p className="mt-1 text-xs">
              Clicca su un componente nel canvas per modificarne le proprieta
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
