import { registerAppHandlers } from './app.ipc'
import { registerDialogHandlers } from './dialog.ipc'

/**
 * Registra tutti gli IPC handler.
 * In Sprint 0.2: solo app + dialog (skeleton).
 * project, version, template, asset, export saranno aggiunti in Sprint 1.5+.
 */
export function registerAllIpcHandlers(): void {
  registerAppHandlers()
  registerDialogHandlers()
  // registerProjectHandlers(storage)   → Sprint 1.5
  // registerVersionHandlers(storage)   → Sprint 1.5
  // registerTemplateHandlers(storage)  → Sprint 5.2
  // registerAssetHandlers(storage)     → Sprint 1.5
  // registerExportHandlers()           → Sprint 3.2
}
