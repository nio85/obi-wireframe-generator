import { useUiStore } from '@/store/ui.store'
import { Toolbar } from './Toolbar'
import { StatusBar } from './StatusBar'
import { LibraryPanel } from '@/features/library/components/LibraryPanel'
import { Canvas } from '@/features/canvas/components/Canvas'
import { ConfigPanel } from '@/features/config/components/ConfigPanel'

export function AppShell() {
  const libraryPanelOpen = useUiStore((s) => s.libraryPanelOpen)
  const configPanelOpen = useUiStore((s) => s.configPanelOpen)

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      <Toolbar />

      <div className="flex min-h-0 flex-1">
        {/* Library Panel */}
        <div
          className={`flex-shrink-0 border-r border-border transition-[width] duration-200 ease-in-out ${
            libraryPanelOpen ? 'w-[240px]' : 'w-0'
          } overflow-hidden`}
        >
          <div className="h-full w-[240px]">
            <LibraryPanel />
          </div>
        </div>

        {/* Canvas */}
        <div className="min-w-0 flex-1">
          <Canvas />
        </div>

        {/* Config Panel */}
        <div
          className={`flex-shrink-0 border-l border-border transition-[width] duration-200 ease-in-out ${
            configPanelOpen ? 'w-[320px]' : 'w-0'
          } overflow-hidden`}
        >
          <div className="h-full w-[320px]">
            <ConfigPanel />
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}
