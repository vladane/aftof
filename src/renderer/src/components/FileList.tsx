import { useEffect, useRef, useState } from 'react'
import type { ScannedFile } from '@shared/types'
import { basename, mediaUrl } from '../lib/format'
import { PREVIEWABLE, categoryOf } from '../lib/categories'
import { useI18n } from '../lib/i18n'
import {
  ArchiveIcon,
  AudioIcon,
  DocumentIcon,
  FileIcon,
  ImageIcon,
  VideoIcon
} from './Icons'

const ROW_HEIGHT = 56
const OVERSCAN = 6

interface FileListProps {
  files: ScannedFile[]
  selected: Set<string>
  onToggle: (path: string, index: number, shiftKey: boolean) => void
}

function TypeIcon({ ext }: { ext: string }): JSX.Element {
  switch (categoryOf(ext)) {
    case 'image':
      return <ImageIcon />
    case 'video':
      return <VideoIcon />
    case 'audio':
      return <AudioIcon />
    case 'document':
      return <DocumentIcon />
    case 'archive':
      return <ArchiveIcon />
    default:
      return <FileIcon />
  }
}

function Thumb({ file }: { file: ScannedFile }): JSX.Element {
  const [failed, setFailed] = useState(false)
  const canPreview = PREVIEWABLE.has(file.ext) && file.size < 25 * 1024 * 1024

  if (!canPreview || failed) {
    return (
      <span className="thumb thumb--icon" data-kind={categoryOf(file.ext)}>
        <TypeIcon ext={file.ext} />
      </span>
    )
  }

  return (
    <span className="thumb">
      <img
        src={mediaUrl(file.path)}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  )
}

export function FileList({ files, selected, onToggle }: FileListProps): JSX.Element {
  const { formatBytes, formatDate } = useI18n()
  const viewportRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(600)

  useEffect(() => {
    const element = viewportRef.current
    if (!element) return
    const observer = new ResizeObserver(() => setViewportHeight(element.clientHeight))
    observer.observe(element)
    setViewportHeight(element.clientHeight)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0 })
    setScrollTop(0)
  }, [files.length])

  const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
  const last = Math.min(files.length, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + OVERSCAN)
  const visible = files.slice(first, last)

  return (
    <div
      className="file-list"
      ref={viewportRef}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div className="file-list__spacer" style={{ height: files.length * ROW_HEIGHT }}>
        {visible.map((file, offset) => {
          const index = first + offset
          const isSelected = selected.has(file.path)
          return (
            <div
              key={file.path}
              className={`file-row${isSelected ? ' file-row--selected' : ''}`}
              style={{ top: index * ROW_HEIGHT, height: ROW_HEIGHT }}
              onClick={(event) => onToggle(file.path, index, event.shiftKey)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault()
                  onToggle(file.path, index, event.shiftKey)
                }
              }}
            >
              <span className={`checkbox${isSelected ? ' checkbox--on' : ''}`} aria-hidden="true" />
              <Thumb file={file} />
              <span className="file-row__main">
                <span className="file-row__name" title={file.path}>
                  {file.name}
                </span>
                <span className="file-row__meta">
                  {basename(file.sourceRoot)}
                  {file.relativeDir ? ` › ${file.relativeDir}` : ''}
                </span>
              </span>
              <span className="file-row__size">{formatBytes(file.size)}</span>
              <span className="file-row__date">{formatDate(file.mtime)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
