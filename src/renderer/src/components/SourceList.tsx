import { basename } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { FolderIcon, FolderPlusIcon, TrashIcon } from './Icons'

interface SourceListProps {
  folders: string[]
  counts: Record<string, number>
  scanning: boolean
  onAdd: () => void
  onRemove: (folder: string) => void
  onClear: () => void
}

export function SourceList({
  folders,
  counts,
  scanning,
  onAdd,
  onRemove,
  onClear
}: SourceListProps): JSX.Element {
  const { t } = useI18n()

  return (
    <section className="panel">
      <header className="panel__header">
        <h2>{t('sources.title')}</h2>
        {folders.length > 0 && (
          <button className="link-button" onClick={onClear} type="button">
            {t('sources.clear')}
          </button>
        )}
      </header>

      <button className="button button--primary button--block" onClick={onAdd} type="button">
        <FolderPlusIcon />
        {t('sources.add')}
      </button>

      {folders.length === 0 ? (
        <p className="hint">{t('sources.empty')}</p>
      ) : (
        <ul className="source-list">
          {folders.map((folder) => (
            <li className="source-item" key={folder}>
              <FolderIcon className="source-item__icon" />
              <span className="source-item__text">
                <span className="source-item__name" title={folder}>
                  {basename(folder)}
                </span>
                <span className="source-item__meta">
                  {scanning
                    ? t('sources.scanning')
                    : t('sources.fileCount', { count: counts[folder] ?? 0 })}
                </span>
              </span>
              <button
                className="icon-button"
                onClick={() => onRemove(folder)}
                title={t('sources.remove')}
                type="button"
              >
                <TrashIcon size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
