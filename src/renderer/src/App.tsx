import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  ConflictStrategy,
  ScannedFile,
  TransferMode,
  TransferProgress,
  TransferResult
} from '@shared/types'
import { AboutDialog } from './components/AboutDialog'
import { FileList } from './components/FileList'
import { LanguageMenu } from './components/LanguageMenu'
import { SourceList } from './components/SourceList'
import { Switch } from './components/Switch'
import { TransferDialog } from './components/TransferDialog'
import {
  CopyIcon,
  HeartIcon,
  MoonIcon,
  MoveIcon,
  RefreshIcon,
  SearchIcon,
  SunIcon,
  TargetFolderIcon
} from './components/Icons'
import { categoryLabelKey, categoryOf, type CategoryId } from './lib/categories'
import { basename } from './lib/format'
import { useI18n } from './lib/i18n'
import { usePersistentState } from './lib/usePersistentState'

const CONFLICT_STRATEGIES: ConflictStrategy[] = ['rename', 'skip', 'overwrite']

export default function App(): JSX.Element {
  const { t, formatBytes } = useI18n()
  const [theme, setTheme] = usePersistentState<'dark' | 'light'>('theme', 'dark')
  const [folders, setFolders] = useState<string[]>([])
  const [files, setFiles] = useState<ScannedFile[]>([])
  const [scanErrors, setScanErrors] = useState<string[]>([])
  const [scanning, setScanning] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId>('all')
  const [recursive, setRecursive] = usePersistentState('recursive', true)
  const [includeHidden, setIncludeHidden] = usePersistentState('includeHidden', false)

  const [destination, setDestination] = usePersistentState<string | null>('destination', null)
  const [mode, setMode] = usePersistentState<TransferMode>('mode', 'copy')
  const [conflict, setConflict] = usePersistentState<ConflictStrategy>('conflict', 'rename')
  const [keepStructure, setKeepStructure] = usePersistentState('keepStructure', false)

  const [progress, setProgress] = useState<TransferProgress | null>(null)
  const [result, setResult] = useState<TransferResult | null>(null)
  const [running, setRunning] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const knownPaths = useRef<Set<string>>(new Set())
  const lastToggled = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Запомненная папка назначения могла быть удалена или отключена вместе с диском.
  useEffect(() => {
    if (!destination) return
    void window.api.isDirectory(destination).then((exists) => {
      if (!exists) setDestination(null)
    })
  }, [])

  useEffect(() => window.api.onTransferProgress(setProgress), [])

  const rescan = useCallback(
    async (roots: string[]) => {
      if (roots.length === 0) {
        knownPaths.current = new Set()
        setFiles([])
        setSelected(new Set())
        setScanErrors([])
        return
      }

      setScanning(true)
      try {
        const scan = await window.api.scanFolders(roots, { recursive, includeHidden })
        const previous = knownPaths.current
        const currentPaths = new Set(scan.files.map((file) => file.path))

        setFiles(scan.files)
        setScanErrors(scan.errors)
        setSelected((current) => {
          const next = new Set<string>()
          for (const path of currentPaths) {
            // Новые файлы выбираем сразу, ранее снятые галочки сохраняем.
            if (!previous.has(path) || current.has(path)) next.add(path)
          }
          return next
        })
        knownPaths.current = currentPaths
      } finally {
        setScanning(false)
      }
    },
    [includeHidden, recursive]
  )

  useEffect(() => {
    void rescan(folders)
  }, [folders, rescan])

  const addFolders = useCallback(async (incoming: string[]) => {
    if (incoming.length === 0) return
    setFolders((current) => {
      const merged = [...current]
      for (const folder of incoming) {
        if (!merged.includes(folder)) merged.push(folder)
      }
      return merged
    })
  }, [])

  const handleAddClick = useCallback(async () => {
    const picked = await window.api.selectFolders()
    void addFolders(picked)
  }, [addFolders])

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault()
      setDragOver(false)
      const paths = Array.from(event.dataTransfer.files).map((file) =>
        window.api.getDroppedPath(file)
      )
      const directories: string[] = []
      for (const path of paths) {
        if (await window.api.isDirectory(path)) directories.push(path)
      }
      void addFolders(directories)
    },
    [addFolders]
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const file of files) {
      map[file.sourceRoot] = (map[file.sourceRoot] ?? 0) + 1
    }
    return map
  }, [files])

  const visibleFiles = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return files.filter((file) => {
      if (category !== 'all' && categoryOf(file.ext) !== category) return false
      if (needle && !file.name.toLowerCase().includes(needle)) return false
      return true
    })
  }, [category, files, query])

  const availableCategories = useMemo(() => {
    const present = new Set(files.map((file) => categoryOf(file.ext)))
    return (['all', 'image', 'video', 'audio', 'document', 'archive', 'other'] as CategoryId[]).filter(
      (id) => id === 'all' || present.has(id as Exclude<CategoryId, 'all'>)
    )
  }, [files])

  const selectedFiles = useMemo(
    () => files.filter((file) => selected.has(file.path)),
    [files, selected]
  )
  const selectedSize = useMemo(
    () => selectedFiles.reduce((sum, file) => sum + file.size, 0),
    [selectedFiles]
  )

  const visibleAllSelected =
    visibleFiles.length > 0 && visibleFiles.every((file) => selected.has(file.path))

  const toggleFile = useCallback(
    (path: string, index: number, shiftKey: boolean) => {
      setSelected((current) => {
        const next = new Set(current)
        const shouldSelect = !next.has(path)
        const from = lastToggled.current
        const range =
          shiftKey && from !== null
            ? visibleFiles.slice(Math.min(from, index), Math.max(from, index) + 1)
            : [visibleFiles[index]].filter(Boolean)

        for (const file of range) {
          if (shouldSelect) next.add(file.path)
          else next.delete(file.path)
        }
        return next
      })
      lastToggled.current = index
    },
    [visibleFiles]
  )

  const toggleAllVisible = useCallback(() => {
    setSelected((current) => {
      const next = new Set(current)
      if (visibleAllSelected) {
        for (const file of visibleFiles) next.delete(file.path)
      } else {
        for (const file of visibleFiles) next.add(file.path)
      }
      return next
    })
  }, [visibleAllSelected, visibleFiles])

  const chooseDestination = useCallback(async () => {
    const picked = await window.api.selectDestination()
    if (picked) setDestination(picked)
  }, [])

  const destinationIsSource = destination !== null && folders.includes(destination)
  const canStart = selectedFiles.length > 0 && destination !== null && !running && !scanning

  const start = useCallback(async () => {
    if (!destination || selectedFiles.length === 0) return
    setRunning(true)
    setResult(null)
    setProgress(null)
    try {
      const transferResult = await window.api.startTransfer({
        files: selectedFiles,
        destination,
        mode,
        conflict,
        keepStructure
      })
      setResult(transferResult)
      if (mode === 'move') void rescan(folders)
    } catch (error) {
      setResult({
        cancelled: false,
        copied: 0,
        moved: 0,
        skipped: 0,
        failed: selectedFiles.length,
        errors: [{ file: destination, message: (error as Error).message }],
        destination,
        durationMs: 0
      })
    } finally {
      setRunning(false)
    }
  }, [conflict, destination, folders, keepStructure, mode, rescan, selectedFiles])

  const closeDialog = useCallback(() => {
    setResult(null)
    setProgress(null)
  }, [])

  return (
    <div
      className={`app${dragOver ? ' app--drag' : ''}`}
      onDragOver={(event) => {
        event.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={(event) => {
        if (event.currentTarget === event.target) setDragOver(false)
      }}
      onDrop={handleDrop}
    >
      {dragOver && (
        <div className="drop-hint" aria-hidden="true">
          {t('drop.hint')}
        </div>
      )}

      <header className="titlebar">
        <div className="titlebar__brand">
          <span className="logo" aria-hidden="true">
            <TargetFolderIcon size={20} />
          </span>
          <div>
            <h1>Aftof</h1>
            <p>{t('app.tagline')}</p>
          </div>
        </div>
        <div className="titlebar__actions">
          <button
            className="icon-button icon-button--heart"
            onClick={() => setAboutOpen(true)}
            title={t('about.open')}
            type="button"
          >
            <HeartIcon />
          </button>
          <LanguageMenu />
          <button
            className="icon-button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? t('theme.toLight') : t('theme.toDark')}
            type="button"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <SourceList
            folders={folders}
            counts={counts}
            scanning={scanning}
            onAdd={handleAddClick}
            onRemove={(folder) => setFolders((current) => current.filter((f) => f !== folder))}
            onClear={() => setFolders([])}
          />

          <section className="panel">
            <header className="panel__header">
              <h2>{t('scan.title')}</h2>
              <button
                className="icon-button"
                onClick={() => void rescan(folders)}
                title={t('scan.rescan')}
                type="button"
                disabled={folders.length === 0 || scanning}
              >
                <RefreshIcon size={16} />
              </button>
            </header>
            <Switch
              checked={recursive}
              onChange={setRecursive}
              label={t('scan.recursive')}
              description={t('scan.recursiveHint')}
            />
            <Switch
              checked={includeHidden}
              onChange={setIncludeHidden}
              label={t('scan.hidden')}
              description={t('scan.hiddenHint')}
            />
          </section>

          <section className="panel">
            <header className="panel__header">
              <h2>{t('place.title')}</h2>
            </header>
            <Switch
              checked={keepStructure}
              onChange={setKeepStructure}
              label={t('place.keepStructure')}
              description={t('place.keepStructureHint')}
            />
            <label className="field">
              <span className="field__label">{t('place.conflict')}</span>
              <select
                value={conflict}
                onChange={(event) => setConflict(event.target.value as ConflictStrategy)}
              >
                {CONFLICT_STRATEGIES.map((id) => (
                  <option key={id} value={id}>
                    {t(`conflict.${id}`)}
                  </option>
                ))}
              </select>
              <span className="field__hint">{t(`conflict.${conflict}Hint`)}</span>
            </label>
          </section>

          {scanErrors.length > 0 && (
            <section className="panel panel--warning">
              <h2>{t('scan.errorsTitle')}</h2>
              <ul className="error-list">
                {scanErrors.slice(0, 4).map((error) => (
                  <li key={error}>{error}</li>
                ))}
                {scanErrors.length > 4 && (
                  <li>{t('common.andMore', { count: scanErrors.length - 4 })}</li>
                )}
              </ul>
            </section>
          )}
        </aside>

        <main className="content">
          <div className="toolbar">
            <label className="search">
              <SearchIcon size={16} />
              <input
                type="search"
                value={query}
                placeholder={t('search.placeholder')}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="chips">
              {availableCategories.map((id) => (
                <button
                  key={id}
                  className={`chip${category === id ? ' chip--active' : ''}`}
                  onClick={() => setCategory(id)}
                  type="button"
                >
                  {t(categoryLabelKey(id))}
                </button>
              ))}
            </div>
          </div>

          <div className="list-header">
            <button
              className="select-all"
              onClick={toggleAllVisible}
              type="button"
              disabled={visibleFiles.length === 0}
            >
              <span className={`checkbox${visibleAllSelected ? ' checkbox--on' : ''}`} />
              {visibleAllSelected ? t('list.deselectAll') : t('list.selectAll')}
            </button>
            <span className="list-header__count">
              {t('list.count', { count: visibleFiles.length })}
              {visibleFiles.length !== files.length && t('list.countOf', { total: files.length })}
            </span>
          </div>

          {files.length === 0 ? (
            <div className="empty">
              <span className="empty__icon" aria-hidden="true">
                <TargetFolderIcon size={30} />
              </span>
              <h3>{scanning ? t('empty.scanningTitle') : t('empty.title')}</h3>
              <p>{scanning ? t('empty.scanningText') : t('empty.text')}</p>
            </div>
          ) : visibleFiles.length === 0 ? (
            <div className="empty">
              <h3>{t('empty.noMatchTitle')}</h3>
              <p>{t('empty.noMatchText')}</p>
            </div>
          ) : (
            <FileList files={visibleFiles} selected={selected} onToggle={toggleFile} />
          )}
        </main>
      </div>

      <footer className="actionbar">
        <button className="destination" onClick={chooseDestination} type="button">
          <span className="destination__icon">
            <TargetFolderIcon size={18} />
          </span>
          <span className="destination__text">
            <span className="destination__label">{t('dest.label')}</span>
            <span className="destination__value" title={destination ?? undefined}>
              {destination ? basename(destination) : t('dest.placeholder')}
            </span>
          </span>
        </button>

        <div className="mode-switch" role="group" aria-label={t('place.title')}>
          <button
            className={`mode-switch__option${mode === 'copy' ? ' mode-switch__option--active' : ''}`}
            onClick={() => setMode('copy')}
            type="button"
          >
            <CopyIcon size={16} />
            {t('mode.copy')}
          </button>
          <button
            className={`mode-switch__option${mode === 'move' ? ' mode-switch__option--active' : ''}`}
            onClick={() => setMode('move')}
            type="button"
          >
            <MoveIcon size={16} />
            {t('mode.move')}
          </button>
        </div>

        <div className="actionbar__spacer">
          {destinationIsSource && <span className="warning-text">{t('warn.destIsSource')}</span>}
          {selectedFiles.length > 0 && (
            <span className="summary">
              {t('summary.selected', {
                count: selectedFiles.length,
                size: formatBytes(selectedSize)
              })}
              {folders.length > 1 && t('summary.fromFolders', { count: folders.length })}
            </span>
          )}
        </div>

        <button
          className="button button--primary button--large"
          onClick={() => void start()}
          disabled={!canStart}
          type="button"
        >
          {mode === 'copy' ? <CopyIcon size={18} /> : <MoveIcon size={18} />}
          {mode === 'copy' ? t('action.copy') : t('action.move')}
          {selectedFiles.length > 0 ? ` (${selectedFiles.length})` : ''}
        </button>
      </footer>

      {aboutOpen && <AboutDialog onClose={() => setAboutOpen(false)} />}

      {(running || result) && (
        <TransferDialog
          progress={progress}
          result={result}
          onCancel={() => void window.api.cancelTransfer()}
          onClose={closeDialog}
          onOpenDestination={() => {
            if (result) void window.api.openPath(result.destination)
            closeDialog()
          }}
        />
      )}
    </div>
  )
}
