import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { ScanOptions, ScanResult, ScannedFile } from '../shared/types'

const SYSTEM_FILES = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini'])

function isHidden(name: string): boolean {
  return name.startsWith('.')
}

async function walk(
  root: string,
  dir: string,
  options: ScanOptions,
  files: ScannedFile[],
  errors: string[]
): Promise<void> {
  let entries: import('node:fs').Dirent[]
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch (error) {
    errors.push(`${dir}: ${(error as Error).message}`)
    return
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (SYSTEM_FILES.has(entry.name)) continue
    if (!options.includeHidden && isHidden(entry.name)) continue

    if (entry.isDirectory()) {
      if (options.recursive) {
        await walk(root, fullPath, options, files, errors)
      }
      continue
    }

    if (!entry.isFile()) continue

    try {
      const stat = await fs.stat(fullPath)
      const ext = path.extname(entry.name).slice(1).toLowerCase()
      files.push({
        path: fullPath,
        name: entry.name,
        ext,
        size: stat.size,
        mtime: stat.mtimeMs,
        sourceRoot: root,
        relativeDir: path.relative(root, dir)
      })
    } catch (error) {
      errors.push(`${fullPath}: ${(error as Error).message}`)
    }
  }
}

export async function scanFolders(roots: string[], options: ScanOptions): Promise<ScanResult> {
  const files: ScannedFile[] = []
  const errors: string[] = []
  const seen = new Set<string>()

  for (const root of roots) {
    const collected: ScannedFile[] = []
    await walk(root, root, options, collected, errors)
    for (const file of collected) {
      if (seen.has(file.path)) continue
      seen.add(file.path)
      files.push(file)
    }
  }

  return { files, errors }
}

/** Проверяет, что путь существует и является папкой. */
export async function isDirectory(target: string): Promise<boolean> {
  try {
    const stat = await fs.stat(target)
    return stat.isDirectory()
  } catch {
    return false
  }
}
