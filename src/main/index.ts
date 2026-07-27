import { app, BrowserWindow, clipboard, dialog, ipcMain, net, protocol, shell } from 'electron'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { isDirectory, scanFolders } from './scanner'
import { isRunning, requestCancel, runTransfer } from './transfer'
import type { ScanOptions, TransferRequest } from '../shared/types'
import { createTranslator, normalizeLocale } from '../shared/i18n'
import { ALLOWED_LINK_HOSTS } from '../shared/author'

let mainWindow: BrowserWindow | null = null
let translator = createTranslator(normalizeLocale('en'))

// Миниатюры фотографий: обычный file:// недоступен из-за CSP и origin страницы.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'aftof-file',
    privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true }
  }
])

/** Открывает ссылку в браузере, но только https и только на известные домены. */
async function openExternalLink(rawUrl: string): Promise<void> {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return
  }
  if (url.protocol !== 'https:') return
  if (!ALLOWED_LINK_HOSTS.includes(url.hostname)) return
  await shell.openExternal(url.toString())
}

function registerMediaProtocol(): void {
  protocol.handle('aftof-file', async (request) => {
    const url = new URL(request.url)
    const decoded = decodeURIComponent(url.pathname)
    const filePath = process.platform === 'win32' ? decoded.replace(/^\//, '') : decoded
    return net.fetch(pathToFileURL(filePath).toString())
  })
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 780,
    minWidth: 900,
    minHeight: 620,
    show: false,
    title: translator.t('app.windowTitle'),
    backgroundColor: '#0f1117',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      additionalArguments: [
        `--system-locale=${app.getLocale()}`,
        `--app-version=${app.getVersion()}`
      ],
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow?.show())

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void openExternalLink(url)
    return { action: 'deny' }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  translator = createTranslator(normalizeLocale(app.getLocale()))
  registerMediaProtocol()
  registerIpc()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function registerIpc(): void {
  // Язык интерфейса выбирается в окне, но системные диалоги рисует главный процесс.
  ipcMain.handle('app:set-locale', (_event, locale: string) => {
    translator = createTranslator(normalizeLocale(locale))
    mainWindow?.setTitle(translator.t('app.windowTitle'))
  })

  ipcMain.handle('dialog:select-folders', async () => {
    const result = await dialog.showOpenDialog({
      title: translator.t('dialog.selectFoldersTitle'),
      buttonLabel: translator.t('dialog.selectFoldersButton'),
      properties: ['openDirectory', 'multiSelections', 'createDirectory']
    })
    return result.canceled ? [] : result.filePaths
  })

  ipcMain.handle('dialog:select-destination', async () => {
    const result = await dialog.showOpenDialog({
      title: translator.t('dialog.selectDestinationTitle'),
      buttonLabel: translator.t('dialog.selectDestinationButton'),
      properties: ['openDirectory', 'createDirectory']
    })
    return result.canceled ? null : result.filePaths[0]
  })

  ipcMain.handle('fs:is-directory', async (_event, target: string) => isDirectory(target))

  ipcMain.handle('scan:folders', async (_event, roots: string[], options: ScanOptions) =>
    scanFolders(roots, options)
  )

  ipcMain.handle('transfer:start', async (event, request: TransferRequest) => {
    if (isRunning()) throw new Error(translator.t('error.alreadyRunning'))

    return runTransfer(request, (progress) => {
      if (!event.sender.isDestroyed()) {
        event.sender.send('transfer:progress', progress)
      }
    })
  })

  ipcMain.handle('transfer:cancel', () => {
    requestCancel()
  })

  ipcMain.handle('shell:open-external', async (_event, url: string) => openExternalLink(url))

  ipcMain.handle('clipboard:write', (_event, text: string) => {
    clipboard.writeText(text)
  })

  ipcMain.handle('shell:open-path', async (_event, target: string) => shell.openPath(target))
}
