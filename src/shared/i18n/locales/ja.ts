import type { Dictionary } from './ru'

export const ja: Dictionary = {
  'app.tagline': '複数のフォルダのファイルを一つにまとめます',
  'app.windowTitle': 'Aftof — ファイル収集',

  'theme.toLight': 'ライトテーマ',
  'theme.toDark': 'ダークテーマ',
  'language.title': '表示言語',

  'about.open': 'このアプリと支援について',
  'about.version': 'バージョン {version}',
  'about.author': '作者',
  'about.legal': '© {year} {author} · MIT ライセンス',
  'about.github': 'GitHub のソースコード',

  'support.title': '開発を支援する',
  'support.text':
    'Aftof は無料です。時間の節約になったら支援していただけると、新しいバージョンを出し続けられます。',
  'support.boostyHint': 'ロシアの銀行カードと SBP',
  'support.donationAlertsHint': '他国からのカード決済',
  'support.cryptoTitle': '暗号資産',
  'support.cryptoHint': 'USDT — ネットワークを選んでアドレスをコピー',
  'support.copy': 'アドレスをコピー',
  'support.copied': 'アドレスをコピーしました',

  'drop.hint': 'ドロップしてフォルダを追加',

  'sources.title': '取り込み元',
  'sources.clear': 'クリア',
  'sources.add': 'フォルダを追加',
  'sources.empty':
    'フォルダは複数まとめて選べます。ウインドウにドラッグしても構いません。すべてのファイルが一つのリストにまとまります。',
  'sources.scanning': 'スキャン中…',
  'sources.remove': 'フォルダを外す',
  'sources.fileCount': { other: '{count} 件' },

  'scan.title': '検索範囲',
  'scan.rescan': '再スキャン',
  'scan.recursive': 'サブフォルダも含める',
  'scan.recursiveHint': '入れ子のフォルダの中も検索します',
  'scan.hidden': '隠しファイル',
  'scan.hiddenHint': '名前がドットで始まるファイル',
  'scan.errorsTitle': '読み取れませんでした',

  'place.title': 'まとめ方',
  'place.keepStructure': 'サブフォルダを保持',
  'place.keepStructureHint': 'オフにするとすべて一つのフォルダに入ります',
  'place.conflict': '同じ名前がある場合',

  'conflict.rename': '名前を変更',
  'conflict.skip': 'スキップ',
  'conflict.overwrite': '置き換え',
  'conflict.renameHint': '名前に番号が付きます：「写真 (2).jpg」',
  'conflict.skipHint': '既存のファイルはそのまま残ります',
  'conflict.overwriteHint': '既存のファイルは上書きされます',

  'search.placeholder': 'ファイル名で検索',

  'category.all': 'すべて',
  'category.image': '写真',
  'category.video': '動画',
  'category.audio': '音声',
  'category.document': '書類',
  'category.archive': '圧縮ファイル',
  'category.other': 'その他',

  'list.selectAll': 'すべて選択',
  'list.deselectAll': '選択を解除',
  'list.count': { other: '{count} 件' },
  'list.countOf': '（全 {total} 件）',

  'empty.scanningTitle': 'フォルダをスキャン中…',
  'empty.scanningText': '数秒で終わります',
  'empty.title': 'まだ何もありません',
  'empty.text': '左からフォルダを追加するか、ここにドラッグしてください。ファイルが一覧に表示されます',
  'empty.noMatchTitle': '見つかりませんでした',
  'empty.noMatchText': '検索条件を変えるか、種類のフィルタを外してください',

  'dest.label': 'まとめ先',
  'dest.placeholder': 'フォルダを選択',
  'mode.copy': 'コピー',
  'mode.move': '移動',
  'warn.destIsSource': 'まとめ先が取り込み元と同じです',
  'summary.selected': { other: '{count} 件を選択中 · {size}' },
  'summary.fromFolders': { other: ' · {count} 個のフォルダから' },
  'action.copy': 'コピー',
  'action.move': '移動',

  'transfer.title': 'ファイルを転送しています',
  'transfer.preparing': '準備中…',
  'transfer.progressCount': '{processed} / {total}',
  'transfer.stop': '停止',

  'result.cancelled': '転送を停止しました',
  'result.done': '完了',
  'result.summaryCopy': { other: '{count} 件を「{folder}」にコピーしました（{duration}）' },
  'result.summaryMove': { other: '{count} 件を「{folder}」に移動しました（{duration}）' },
  'result.success': '成功',
  'result.skipped': 'スキップ',
  'result.failed': '失敗',
  'result.close': '閉じる',
  'result.open': 'フォルダを開く',

  'common.andMore': '…ほか {count} 件',

  'dialog.selectFoldersTitle': 'ファイルの入ったフォルダを選択',
  'dialog.selectFoldersButton': '追加',
  'dialog.selectDestinationTitle': 'ファイルのまとめ先',
  'dialog.selectDestinationButton': 'フォルダを選択',

  'error.alreadyRunning': 'すでに転送が実行中です',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} 秒',
  'duration.minutesSeconds': '{minutes} 分 {seconds} 秒'
}
