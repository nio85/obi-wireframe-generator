import { ipcMain, dialog, BrowserWindow } from 'electron'
import { IPC_CHANNELS } from '@shared/constants/ipc-channels'
import type { OpenDialogOptions, SaveDialogOptions, MessageDialogOptions } from '@shared/types/api'

export function registerDialogHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.DIALOG_OPEN, async (event, options: OpenDialogOptions) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return null
    const result = await dialog.showOpenDialog(win, {
      title: options.title,
      defaultPath: options.defaultPath,
      filters: options.filters,
      properties: options.properties
    })
    return result.canceled ? null : result.filePaths
  })

  ipcMain.handle(IPC_CHANNELS.DIALOG_SAVE, async (event, options: SaveDialogOptions) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return null
    const result = await dialog.showSaveDialog(win, {
      title: options.title,
      defaultPath: options.defaultPath,
      filters: options.filters
    })
    return result.canceled ? null : result.filePath
  })

  ipcMain.handle(IPC_CHANNELS.DIALOG_MESSAGE, async (event, options: MessageDialogOptions) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return 0
    const result = await dialog.showMessageBox(win, {
      type: options.type ?? 'info',
      title: options.title,
      message: options.message,
      detail: options.detail,
      buttons: options.buttons ?? ['OK'],
      defaultId: options.defaultId,
      cancelId: options.cancelId
    })
    return result.response
  })
}
