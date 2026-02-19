import { contextBridge, ipcRenderer } from 'electron'

// Typed API exposed to renderer via contextBridge.
// Only specific, whitelisted methods — never raw ipcRenderer.
const api = {
  app: {
    getVersion: (): Promise<string> => ipcRenderer.invoke('app:getVersion'),
    getPlatform: (): Promise<string> => ipcRenderer.invoke('app:getPlatform'),
    getUsername: (): Promise<string> => ipcRenderer.invoke('app:getUsername')
  }
  // project, version, template, asset, export, dialog
  // will be added in Sprint 0.2 as IPC handlers are created
}

contextBridge.exposeInMainWorld('api', api)
