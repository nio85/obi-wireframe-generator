import { ipcMain, app } from 'electron'
import { IPC_CHANNELS } from '@shared/constants/ipc-channels'
import os from 'node:os'

export function registerAppHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.APP_GET_VERSION, () => {
    return app.getVersion()
  })

  ipcMain.handle(IPC_CHANNELS.APP_GET_PLATFORM, () => {
    return process.platform
  })

  ipcMain.handle(IPC_CHANNELS.APP_GET_USERNAME, () => {
    return os.userInfo().username
  })
}
