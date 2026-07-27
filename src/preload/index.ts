import { contextBridge, ipcRenderer, webUtils } from 'electron'
import type {
  ScanOptions,
  ScanResult,
  TransferProgress,
  TransferRequest,
  TransferResult
} from '../shared/types'

const LOCALE_FLAG = '--system-locale='
const VERSION_FLAG = '--app-version='

const api = {
  platform: process.platform,
  /** Язык системы, переданный главным процессом при создании окна. */
  systemLocale: process.argv.find((arg) => arg.startsWith(LOCALE_FLAG))?.slice(LOCALE_FLAG.length),
  appVersion:
    process.argv.find((arg) => arg.startsWith(VERSION_FLAG))?.slice(VERSION_FLAG.length) ?? '',

  setLocale: (locale: string): Promise<void> => ipcRenderer.invoke('app:set-locale', locale),

  selectFolders: (): Promise<string[]> => ipcRenderer.invoke('dialog:select-folders'),
  selectDestination: (): Promise<string | null> => ipcRenderer.invoke('dialog:select-destination'),
  isDirectory: (target: string): Promise<boolean> => ipcRenderer.invoke('fs:is-directory', target),

  scanFolders: (roots: string[], options: ScanOptions): Promise<ScanResult> =>
    ipcRenderer.invoke('scan:folders', roots, options),

  startTransfer: (request: TransferRequest): Promise<TransferResult> =>
    ipcRenderer.invoke('transfer:start', request),
  cancelTransfer: (): Promise<void> => ipcRenderer.invoke('transfer:cancel'),

  onTransferProgress: (callback: (progress: TransferProgress) => void): (() => void) => {
    const listener = (_event: Electron.IpcRendererEvent, progress: TransferProgress): void =>
      callback(progress)
    ipcRenderer.on('transfer:progress', listener)
    return () => ipcRenderer.removeListener('transfer:progress', listener)
  },

  openPath: (target: string): Promise<string> => ipcRenderer.invoke('shell:open-path', target),
  openExternal: (url: string): Promise<void> => ipcRenderer.invoke('shell:open-external', url),
  copyText: (text: string): Promise<void> => ipcRenderer.invoke('clipboard:write', text),

  /** Путь перетащенного в окно файла или папки (file.path в Electron 32+ недоступен). */
  getDroppedPath: (file: File): string => webUtils.getPathForFile(file)
}

contextBridge.exposeInMainWorld('api', api)

export type Api = typeof api
