export type CategoryId = 'all' | 'image' | 'video' | 'audio' | 'document' | 'archive' | 'other'

const IMAGE = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'tif',
  'tiff',
  'heic',
  'heif',
  'svg',
  'raw',
  'cr2',
  'cr3',
  'nef',
  'arw',
  'dng',
  'orf',
  'rw2',
  'avif'
])
const VIDEO = new Set(['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm', 'm4v', 'mpg', 'mpeg', '3gp'])
const AUDIO = new Set(['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma', 'aiff', 'opus'])
const DOCUMENT = new Set([
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'txt',
  'rtf',
  'odt',
  'ods',
  'csv',
  'pages',
  'numbers',
  'key',
  'md'
])
const ARCHIVE = new Set(['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'iso', 'dmg'])

export const PREVIEWABLE = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'avif', 'svg'])

export function categoryOf(ext: string): Exclude<CategoryId, 'all'> {
  if (IMAGE.has(ext)) return 'image'
  if (VIDEO.has(ext)) return 'video'
  if (AUDIO.has(ext)) return 'audio'
  if (DOCUMENT.has(ext)) return 'document'
  if (ARCHIVE.has(ext)) return 'archive'
  return 'other'
}

export function categoryLabelKey(id: CategoryId): `category.${CategoryId}` {
  return `category.${id}`
}
