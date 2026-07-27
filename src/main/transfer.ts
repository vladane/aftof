import { createReadStream, createWriteStream, promises as fs } from 'node:fs'
import path from 'node:path'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type {
  TransferError,
  TransferProgress,
  TransferRequest,
  TransferResult
} from '../shared/types'

let cancelRequested = false
let running = false

export function requestCancel(): void {
  if (running) cancelRequested = true
}

export function isRunning(): boolean {
  return running
}

/** Подбирает свободное имя вида «фото (2).jpg». */
async function uniqueTarget(target: string, taken: Set<string>): Promise<string> {
  const dir = path.dirname(target)
  const ext = path.extname(target)
  const base = path.basename(target, ext)

  let candidate = target
  let counter = 1
  while (taken.has(candidate.toLowerCase()) || (await exists(candidate))) {
    counter += 1
    candidate = path.join(dir, `${base} (${counter})${ext}`)
  }
  return candidate
}

async function exists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

async function copyStream(
  source: string,
  target: string,
  onChunk: (bytes: number) => void
): Promise<void> {
  const counter = new Transform({
    transform(chunk, _encoding, callback) {
      onChunk(chunk.length)
      callback(null, chunk)
    }
  })

  await pipeline(createReadStream(source), counter, createWriteStream(target))

  // Переносим дату съёмки/изменения, иначе сортировка по дате в галерее ломается.
  try {
    const stat = await fs.stat(source)
    await fs.utimes(target, stat.atime, stat.mtime)
  } catch {
    // Некритично: файл скопирован, метаданные времени просто останутся новыми.
  }
}

export async function runTransfer(
  request: TransferRequest,
  onProgress: (progress: TransferProgress) => void
): Promise<TransferResult> {
  const startedAt = Date.now()
  running = true
  cancelRequested = false

  const { files, destination, mode, conflict, keepStructure } = request
  const errors: TransferError[] = []
  const takenTargets = new Set<string>()

  let copied = 0
  let moved = 0
  let skipped = 0
  let failed = 0
  let bytesDone = 0
  const bytesTotal = files.reduce((sum, file) => sum + file.size, 0)

  let lastEmit = 0
  const emit = (currentFile: string, processed: number, force = false): void => {
    const now = Date.now()
    if (!force && now - lastEmit < 80) return
    lastEmit = now
    onProgress({
      processed,
      total: files.length,
      bytesDone,
      bytesTotal,
      currentFile,
      copied,
      moved,
      skipped,
      failed
    })
  }

  await fs.mkdir(destination, { recursive: true })
  emit('', 0, true)

  for (let index = 0; index < files.length; index += 1) {
    if (cancelRequested) break

    const file = files[index]
    const targetDir =
      keepStructure && file.relativeDir ? path.join(destination, file.relativeDir) : destination
    let target = path.join(targetDir, file.name)

    try {
      // Файл уже лежит там, куда его просят положить.
      if (path.resolve(file.path) === path.resolve(target)) {
        skipped += 1
        bytesDone += file.size
        emit(file.name, index + 1)
        continue
      }

      await fs.mkdir(targetDir, { recursive: true })

      const conflicting = takenTargets.has(target.toLowerCase()) || (await exists(target))
      if (conflicting) {
        if (conflict === 'skip') {
          skipped += 1
          bytesDone += file.size
          emit(file.name, index + 1)
          continue
        }
        if (conflict === 'rename') {
          target = await uniqueTarget(target, takenTargets)
        }
        // overwrite — пишем поверх
      }
      takenTargets.add(target.toLowerCase())

      const startBytes = bytesDone
      if (mode === 'move') {
        try {
          await fs.rename(file.path, target)
          bytesDone = startBytes + file.size
          moved += 1
        } catch (error) {
          // Разные диски/тома — копируем и удаляем оригинал.
          if ((error as NodeJS.ErrnoException).code !== 'EXDEV') throw error
          await copyStream(file.path, target, (bytes) => {
            bytesDone += bytes
            emit(file.name, index)
          })
          await fs.unlink(file.path)
          bytesDone = startBytes + file.size
          moved += 1
        }
      } else {
        await copyStream(file.path, target, (bytes) => {
          bytesDone += bytes
          emit(file.name, index)
        })
        bytesDone = startBytes + file.size
        copied += 1
      }
    } catch (error) {
      failed += 1
      bytesDone += file.size
      errors.push({ file: file.path, message: (error as Error).message })
    }

    emit(file.name, index + 1)
  }

  emit('', files.length, true)
  running = false

  const wasCancelled = cancelRequested
  cancelRequested = false

  return {
    cancelled: wasCancelled,
    copied,
    moved,
    skipped,
    failed,
    errors,
    destination,
    durationMs: Date.now() - startedAt
  }
}
