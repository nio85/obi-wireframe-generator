// Typed API contract for the renderer process.
// Must match what preload/index.ts exposes via contextBridge.

export interface AppAPI {
  getVersion: () => Promise<string>
  getPlatform: () => Promise<string>
  getUsername: () => Promise<string>
}

export interface ExposedAPI {
  app: AppAPI
  // project, version, template, asset, export, dialog
  // will be added in Sprint 0.2
}

declare global {
  interface Window {
    api: ExposedAPI
  }
}
