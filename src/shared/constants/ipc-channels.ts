/**
 * Canali IPC tipizzati.
 * Convenzione: `{dominio}:{azione}`
 */
export const IPC_CHANNELS = {
  // Project
  PROJECT_LIST: 'project:list',
  PROJECT_LOAD: 'project:load',
  PROJECT_SAVE: 'project:save',
  PROJECT_CREATE: 'project:create',
  PROJECT_DELETE: 'project:delete',
  PROJECT_DUPLICATE: 'project:duplicate',

  // Version
  VERSION_CREATE: 'version:create',
  VERSION_SAVE: 'version:save',
  VERSION_DELETE: 'version:delete',
  VERSION_LOAD_ASSETS: 'version:load-assets',

  // Template
  TEMPLATE_LIST_BUILTIN: 'template:list-builtin',
  TEMPLATE_LIST_CUSTOM: 'template:list-custom',
  TEMPLATE_SAVE_CUSTOM: 'template:save-custom',
  TEMPLATE_DELETE_CUSTOM: 'template:delete-custom',
  TEMPLATE_IMPORT: 'template:import',
  TEMPLATE_EXPORT: 'template:export',

  // Asset
  ASSET_IMPORT_IMAGE: 'asset:import-image',
  ASSET_GET_PATH: 'asset:get-path',

  // Export / Import
  EXPORT_PNG: 'export:png',
  EXPORT_PDF: 'export:pdf',
  EXPORT_ZIP: 'export:zip',
  EXPORT_IMPORT_ZIP: 'export:import-zip',

  // Dialog
  DIALOG_OPEN: 'dialog:open',
  DIALOG_SAVE: 'dialog:save',
  DIALOG_MESSAGE: 'dialog:message',

  // App
  APP_GET_VERSION: 'app:get-version',
  APP_GET_PLATFORM: 'app:get-platform',
  APP_GET_USERNAME: 'app:get-username',
  MENU_ACTION: 'menu:action',

  // Storage (project-level)
  STORAGE_GET_PATH: 'storage:get-path',
  STORAGE_SET_PATH: 'storage:set-path'
} as const

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS]
