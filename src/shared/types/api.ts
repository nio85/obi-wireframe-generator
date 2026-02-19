// ═══════════════════════════════════════════
// ElectronAPI — contratto condiviso preload/renderer
// ═══════════════════════════════════════════

import type { ProjectSummary, Project } from './project'
import type { WireframeVersion } from './wireframe-version'
import type { TemplateDefinition } from './template'
import type { AssetReference, AssetMap } from './asset'
import type { ExportMetadata } from './export'

export interface ElectronAPI {
  project: {
    list: () => Promise<ProjectSummary[]>
    load: (projectId: string) => Promise<Project>
    save: (project: Project) => Promise<void>
    create: (name: string, description?: string) => Promise<Project>
    delete: (projectId: string) => Promise<void>
    duplicate: (projectId: string, newName: string) => Promise<Project>
    getStoragePath: () => Promise<string>
    setStoragePath: (path: string) => Promise<void>
  }

  version: {
    create: (
      projectId: string,
      name: string,
      basedOnVersionId?: string
    ) => Promise<WireframeVersion>
    save: (projectId: string, version: WireframeVersion) => Promise<void>
    delete: (projectId: string, versionId: string) => Promise<void>
    loadAssets: (projectId: string, versionId: string) => Promise<AssetMap>
  }

  template: {
    listBuiltIn: () => Promise<TemplateDefinition[]>
    listCustom: () => Promise<TemplateDefinition[]>
    saveCustom: (template: TemplateDefinition) => Promise<void>
    deleteCustom: (templateId: string) => Promise<void>
    importTemplate: (filePath: string) => Promise<TemplateDefinition>
    exportTemplate: (templateId: string, targetPath: string) => Promise<void>
  }

  asset: {
    importImage: (projectId: string, versionId: string) => Promise<AssetReference>
    getImagePath: (
      projectId: string,
      versionId: string,
      assetId: string
    ) => Promise<string>
  }

  export: {
    toPNG: (html: string, width: number, height: number) => Promise<string>
    toPDF: (html: string, metadata: ExportMetadata) => Promise<string>
    toZIP: (projectId: string) => Promise<string>
    fromZIP: (filePath: string) => Promise<Project>
  }

  dialog: {
    showOpen: (options: OpenDialogOptions) => Promise<string[] | null>
    showSave: (options: SaveDialogOptions) => Promise<string | null>
    showMessage: (options: MessageDialogOptions) => Promise<number>
  }

  app: {
    getVersion: () => Promise<string>
    getPlatform: () => Promise<string>
    getUsername: () => Promise<string>
    onMenuAction: (callback: (action: string) => void) => () => void
    removeMenuActionListener: () => void
  }
}

// Dialog option types (subset of Electron's dialog options)
export interface OpenDialogOptions {
  title?: string
  defaultPath?: string
  filters?: Array<{ name: string; extensions: string[] }>
  properties?: Array<
    'openFile' | 'openDirectory' | 'multiSelections' | 'createDirectory'
  >
}

export interface SaveDialogOptions {
  title?: string
  defaultPath?: string
  filters?: Array<{ name: string; extensions: string[] }>
}

export interface MessageDialogOptions {
  type?: 'none' | 'info' | 'error' | 'question' | 'warning'
  title?: string
  message: string
  detail?: string
  buttons?: string[]
  defaultId?: number
  cancelId?: number
}

// Global window augmentation
declare global {
  interface Window {
    api: ElectronAPI
  }
}
