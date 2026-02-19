import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

export function LibraryPanel() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border px-3 py-2">
        <h2 className="text-sm font-semibold text-foreground">Componenti</h2>
      </div>

      {/* Search */}
      <div className="flex-shrink-0 px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Cerca componenti..."
            className="h-8 pl-8 text-xs"
          />
        </div>
      </div>

      {/* Component list placeholder */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
            <div className="rounded-lg border border-dashed border-border p-6">
              <p className="font-medium">Nessun template</p>
              <p className="mt-1">I template saranno disponibili nello Sprint 1.2</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
