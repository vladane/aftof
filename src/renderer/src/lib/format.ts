export function basename(fullPath: string): string {
  const parts = fullPath.split(/[\\/]/).filter(Boolean)
  return parts[parts.length - 1] ?? fullPath
}

export function mediaUrl(fullPath: string): string {
  const normalized = fullPath.replace(/\\/g, '/')
  const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`
  return `aftof-file://local${withSlash.split('/').map(encodeURIComponent).join('/')}`
}
