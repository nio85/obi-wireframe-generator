import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '@shared/constants/ipc-channels'

// Typed API exposed to renderer via contextBridge.
// Only specific, whitelisted methods — never raw ipcRenderer.

const api = {
  project: {
    list: () => ipcRenderer.invoke(IPC_CHANNELS.PROJECT_LIST),
    load: (projectId: string) => ipcRenderer.invoke(IPC_CHANNELS.PROJECT_LOAD, projectId),
    save: (project: unknown) => ipcRenderer.invoke(IPC_CHANNELS.PROJECT_SAVE, project),
    create: (name: string, description?: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_CREATE, name, description),
    delete: (projectId: string) => ipcRenderer.invoke(IPC_CHANNELS.PROJECT_DELETE, projectId),
    duplicate: (projectId: string, newName: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.PROJECT_DUPLICATE, projectId, newName),
    getStoragePath: () => ipcRenderer.invoke(IPC_CHANNELS.STORAGE_GET_PATH),
    setStoragePath: (path: string) => ipcRenderer.invoke(IPC_CHANNELS.STORAGE_SET_PATH, path)
  },

  version: {
    create: (projectId: string, name: string, basedOnVersionId?: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_CREATE, projectId, name, basedOnVersionId),
    save: (projectId: string, version: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_SAVE, projectId, version),
    delete: (projectId: string, versionId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_DELETE, projectId, versionId),
    loadAssets: (projectId: string, versionId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.VERSION_LOAD_ASSETS, projectId, versionId)
  },

  template: {
    listBuiltIn: () => ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_LIST_BUILTIN),
    listCustom: () => ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_LIST_CUSTOM),
    saveCustom: (template: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_SAVE_CUSTOM, template),
    deleteCustom: (templateId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_DELETE_CUSTOM, templateId),
    importTemplate: (filePath: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_IMPORT, filePath),
    exportTemplate: (templateId: string, targetPath: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.TEMPLATE_EXPORT, templateId, targetPath)
  },

  asset: {
    importImage: (projectId: string, versionId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.ASSET_IMPORT_IMAGE, projectId, versionId),
    getImagePath: (projectId: string, versionId: string, assetId: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.ASSET_GET_PATH, projectId, versionId, assetId)
  },

  export: {
    toPNG: (html: string, width: number, height: number) =>
      ipcRenderer.invoke(IPC_CHANNELS.EXPORT_PNG, html, width, height),
    toPDF: (html: string, metadata: unknown) =>
      ipcRenderer.invoke(IPC_CHANNELS.EXPORT_PDF, html, metadata),
    toZIP: (projectId: string) => ipcRenderer.invoke(IPC_CHANNELS.EXPORT_ZIP, projectId),
    fromZIP: (filePath: string) => ipcRenderer.invoke(IPC_CHANNELS.IMPORT_ZIP, filePath)
  },

  dialog: {
    showOpen: (options: unknown) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG_OPEN, options),
    showSave: (options: unknown) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG_SAVE, options),
    showMessage: (options: unknown) => ipcRenderer.invoke(IPC_CHANNELS.DIALOG_MESSAGE, options)
  },

  app: {
    getVersion: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION),
    getPlatform: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_PLATFORM),
    getUsername: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_USERNAME),
    onMenuAction: (callback: (action: string) => void) => {
      const handler = (_event: Electron.IpcRendererEvent, action: string): void => callback(action)
      ipcRenderer.on(IPC_CHANNELS.MENU_ACTION, handler)
    },
    removeMenuActionListener: () => {
      ipcRenderer.removeAllListeners(IPC_CHANNELS.MENU_ACTION)
    }
  }
}

contextBridge.exposeInMainWorld('api', api)
