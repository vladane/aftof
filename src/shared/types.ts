export type TransferMode = 'copy' | 'move'
export type ConflictStrategy = 'rename' | 'skip' | 'overwrite'

export interface ScanOptions {
  recursive: boolean
  includeHidden: boolean
}

export interface ScannedFile {
  /** Абсолютный путь к файлу */
  path: string
  /** Имя файла с расширением */
  name: string
  /** Расширение в нижнем регистре, без точки ('' если его нет) */
  ext: string
  size: number
  /** Время изменения, мс */
  mtime: number
  /** Корневая папка-источник, из которой файл был просканирован */
  sourceRoot: string
  /** Путь папки файла относительно sourceRoot ('' если файл лежит в корне) */
  relativeDir: string
}

export interface ScanResult {
  files: ScannedFile[]
  errors: string[]
}

export interface TransferRequest {
  files: ScannedFile[]
  destination: string
  mode: TransferMode
  conflict: ConflictStrategy
  /** Сохранять структуру подпапок вместо складывания всего в одну папку */
  keepStructure: boolean
}

export interface TransferProgress {
  /** Обработано файлов (включая пропущенные и ошибочные) */
  processed: number
  total: number
  bytesDone: number
  bytesTotal: number
  currentFile: string
  copied: number
  moved: number
  skipped: number
  failed: number
}

export interface TransferError {
  file: string
  message: string
}

export interface TransferResult {
  cancelled: boolean
  copied: number
  moved: number
  skipped: number
  failed: number
  errors: TransferError[]
  destination: string
  durationMs: number
}
