import type { TransferProgress, TransferResult } from '@shared/types'
import { basename } from '../lib/format'
import { useI18n } from '../lib/i18n'
import { AlertIcon, CheckIcon, ExternalIcon } from './Icons'

interface TransferDialogProps {
  progress: TransferProgress | null
  result: TransferResult | null
  onCancel: () => void
  onClose: () => void
  onOpenDestination: () => void
}

export function TransferDialog({
  progress,
  result,
  onCancel,
  onClose,
  onOpenDestination
}: TransferDialogProps): JSX.Element {
  const { t, formatBytes, formatDuration } = useI18n()

  const percent = (): number => {
    if (!progress) return 0
    if (progress.bytesTotal > 0) {
      return Math.min(100, (progress.bytesDone / progress.bytesTotal) * 100)
    }
    return progress.total > 0 ? (progress.processed / progress.total) * 100 : 0
  }

  const done = result ? result.copied + result.moved : 0

  return (
    <div className="overlay">
      <div className="dialog" role="dialog" aria-modal="true">
        {result ? (
          <>
            <div className={`dialog__badge${result.failed > 0 ? ' dialog__badge--warn' : ''}`}>
              {result.failed > 0 ? <AlertIcon size={26} /> : <CheckIcon size={26} />}
            </div>
            <h2 className="dialog__title">
              {result.cancelled ? t('result.cancelled') : t('result.done')}
            </h2>
            <p className="dialog__subtitle">
              {t(result.moved > 0 ? 'result.summaryMove' : 'result.summaryCopy', {
                count: done,
                folder: basename(result.destination),
                duration: formatDuration(result.durationMs)
              })}
            </p>

            <div className="stats">
              <div className="stat">
                <span className="stat__value">{done}</span>
                <span className="stat__label">{t('result.success')}</span>
              </div>
              <div className="stat">
                <span className="stat__value">{result.skipped}</span>
                <span className="stat__label">{t('result.skipped')}</span>
              </div>
              <div className={`stat${result.failed > 0 ? ' stat--error' : ''}`}>
                <span className="stat__value">{result.failed}</span>
                <span className="stat__label">{t('result.failed')}</span>
              </div>
            </div>

            {result.errors.length > 0 && (
              <ul className="error-list">
                {result.errors.slice(0, 8).map((error) => (
                  <li key={error.file}>
                    <strong>{basename(error.file)}</strong> — {error.message}
                  </li>
                ))}
                {result.errors.length > 8 && (
                  <li>{t('common.andMore', { count: result.errors.length - 8 })}</li>
                )}
              </ul>
            )}

            <div className="dialog__actions">
              <button className="button" onClick={onClose} type="button">
                {t('result.close')}
              </button>
              <button className="button button--primary" onClick={onOpenDestination} type="button">
                <ExternalIcon size={16} />
                {t('result.open')}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="dialog__title">{t('transfer.title')}</h2>
            <p className="dialog__subtitle dialog__subtitle--mono">
              {progress?.currentFile || t('transfer.preparing')}
            </p>

            <div className="progress">
              <div className="progress__bar" style={{ width: `${percent()}%` }} />
            </div>
            <div className="progress__meta">
              <span>
                {t('transfer.progressCount', {
                  processed: progress?.processed ?? 0,
                  total: progress?.total ?? 0
                })}
              </span>
              <span>
                {formatBytes(progress?.bytesDone ?? 0)} / {formatBytes(progress?.bytesTotal ?? 0)}
              </span>
            </div>

            <div className="dialog__actions">
              <button className="button button--danger" onClick={onCancel} type="button">
                {t('transfer.stop')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
