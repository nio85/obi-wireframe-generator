import { create } from 'zustand'
import type { ViewportKey } from '@shared/constants/viewport'

interface UiState {
  // Viewport
  viewport: ViewportKey
  setViewport: (viewport: ViewportKey) => void

  // Panel visibility
  libraryPanelOpen: boolean
  configPanelOpen: boolean
  toggleLibraryPanel: () => void
  toggleConfigPanel: () => void

  // Zoom
  zoom: number
  setZoom: (zoom: number) => void
}

export const useUiStore = create<UiState>((set) => ({
  viewport: 'desktop',
  setViewport: (viewport) => set({ viewport }),

  libraryPanelOpen: true,
  configPanelOpen: true,
  toggleLibraryPanel: () => set((s) => ({ libraryPanelOpen: !s.libraryPanelOpen })),
  toggleConfigPanel: () => set((s) => ({ configPanelOpen: !s.configPanelOpen })),

  zoom: 100,
  setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) })
}))
