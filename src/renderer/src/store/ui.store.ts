import { create } from 'zustand'
import { VIEWPORTS, type ViewportKey } from '@shared/constants/viewport'

const CANVAS_PADDING = 48 // p-6 = 24px * 2

/** Calcola il massimo zoom (%) perche il canvas entri nel container */
function computeFitZoom(containerWidth: number, viewport: ViewportKey): number {
  if (containerWidth <= CANVAS_PADDING) return 100
  const canvasWidth = VIEWPORTS[viewport].width
  const fit = ((containerWidth - CANVAS_PADDING) / canvasWidth) * 100
  return Math.min(Math.floor(fit), 100) // mai oltre 100%
}

interface UiState {
  // Viewport
  viewport: ViewportKey
  setViewport: (viewport: ViewportKey) => void

  // Panel visibility
  libraryPanelOpen: boolean
  configPanelOpen: boolean
  toggleLibraryPanel: () => void
  toggleConfigPanel: () => void

  // Zoom (auto-fit to width)
  zoom: number // effective zoom percentage (clamped to fitZoom)
  setZoom: (zoom: number) => void
  canvasContainerWidth: number // misurato da ResizeObserver
  setCanvasContainerWidth: (width: number) => void
  fitZoom: number // max zoom che entra nel container
}

export const useUiStore = create<UiState>((set) => ({
  viewport: 'desktop',
  setViewport: (viewport) =>
    set((s) => {
      const fitZoom = computeFitZoom(s.canvasContainerWidth, viewport)
      return { viewport, zoom: fitZoom, fitZoom }
    }),

  libraryPanelOpen: true,
  configPanelOpen: true,
  toggleLibraryPanel: () => set((s) => ({ libraryPanelOpen: !s.libraryPanelOpen })),
  toggleConfigPanel: () => set((s) => ({ configPanelOpen: !s.configPanelOpen })),

  zoom: 100,
  fitZoom: 100,
  canvasContainerWidth: 0,

  setZoom: (zoom) =>
    set((s) => ({ zoom: Math.max(25, Math.min(zoom, s.fitZoom)) })),

  setCanvasContainerWidth: (width) =>
    set((s) => {
      const newFitZoom = computeFitZoom(width, s.viewport)
      // Se lo zoom era al massimo (auto-fit), segui il nuovo fitZoom.
      // Se l'utente ha zoomato manualmente sotto il fit, mantieni il suo zoom.
      const wasAutoFit = s.zoom >= s.fitZoom
      return {
        canvasContainerWidth: width,
        fitZoom: newFitZoom,
        zoom: wasAutoFit ? newFitZoom : Math.max(25, Math.min(s.zoom, newFitZoom))
      }
    })
}))
