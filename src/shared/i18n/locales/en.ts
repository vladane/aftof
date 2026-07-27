import type { Dictionary } from './ru'

export const en: Dictionary = {
  'app.tagline': 'Collects files from many folders into one',
  'app.windowTitle': 'Aftof — file collector',

  'theme.toLight': 'Light theme',
  'theme.toDark': 'Dark theme',
  'language.title': 'Interface language',

  'about.open': 'About and support',
  'about.version': 'Version {version}',
  'about.author': 'Author',
  'about.legal': '© {year} {author} · MIT license',
  'about.github': 'Source code on GitHub',

  'support.title': 'Support the development',
  'support.text':
    'Aftof is free. If it saved you time, you can support the work — that is what keeps new versions coming.',
  'support.boostyHint': 'Russian bank cards and SBP',
  'support.donationAlertsHint': 'Card payments from other countries',
  'support.cryptoTitle': 'Crypto',
  'support.cryptoHint': 'USDT — pick a network and copy the address',
  'support.copy': 'Copy address',
  'support.copied': 'Address copied',

  'drop.hint': 'Drop to add folders',

  'sources.title': 'Source folders',
  'sources.clear': 'Clear',
  'sources.add': 'Add folders',
  'sources.empty':
    'Pick several folders at once or drag them into the window — files from all of them end up in one list.',
  'sources.scanning': 'scanning…',
  'sources.remove': 'Remove folder',
  'sources.fileCount': { one: '{count} file', other: '{count} files' },

  'scan.title': 'What to look for',
  'scan.rescan': 'Rescan',
  'scan.recursive': 'Include subfolders',
  'scan.recursiveHint': 'Search for files in nested folders',
  'scan.hidden': 'Hidden files',
  'scan.hiddenHint': 'Files whose name starts with a dot',
  'scan.errorsTitle': 'Could not read',

  'place.title': 'How to place them',
  'place.keepStructure': 'Keep subfolders',
  'place.keepStructureHint': 'Otherwise every file lands in one folder',
  'place.conflict': 'If the name is taken',

  'conflict.rename': 'Rename',
  'conflict.skip': 'Skip',
  'conflict.overwrite': 'Replace',
  'conflict.renameHint': 'A number is added to the name: “photo (2).jpg”',
  'conflict.skipHint': 'The existing file stays untouched',
  'conflict.overwriteHint': 'The existing file will be overwritten',

  'search.placeholder': 'Search by file name',

  'category.all': 'All',
  'category.image': 'Photos',
  'category.video': 'Video',
  'category.audio': 'Audio',
  'category.document': 'Documents',
  'category.archive': 'Archives',
  'category.other': 'Other',

  'list.selectAll': 'Select all',
  'list.deselectAll': 'Deselect all',
  'list.count': { one: '{count} file', other: '{count} files' },
  'list.countOf': ' of {total}',

  'empty.scanningTitle': 'Scanning folders…',
  'empty.scanningText': 'This takes a couple of seconds',
  'empty.title': 'Nothing here yet',
  'empty.text': 'Add folders on the left or drag them here — the files will show up in this list',
  'empty.noMatchTitle': 'Nothing found',
  'empty.noMatchText': 'Change the search or clear the type filter',

  'dest.label': 'Destination',
  'dest.placeholder': 'Choose a folder',
  'mode.copy': 'Copy',
  'mode.move': 'Move',
  'warn.destIsSource': 'The destination folder is also a source',
  'summary.selected': {
    one: '{count} file selected · {size}',
    other: '{count} files selected · {size}'
  },
  'summary.fromFolders': {
    one: ' · from {count} folder',
    other: ' · from {count} folders'
  },
  'action.copy': 'Copy',
  'action.move': 'Move',

  'transfer.title': 'Transferring files',
  'transfer.preparing': 'Preparing…',
  'transfer.progressCount': '{processed} of {total}',
  'transfer.stop': 'Stop',

  'result.cancelled': 'Transfer stopped',
  'result.done': 'Done',
  'result.summaryCopy': {
    one: '{count} file copied to “{folder}” in {duration}',
    other: '{count} files copied to “{folder}” in {duration}'
  },
  'result.summaryMove': {
    one: '{count} file moved to “{folder}” in {duration}',
    other: '{count} files moved to “{folder}” in {duration}'
  },
  'result.success': 'succeeded',
  'result.skipped': 'skipped',
  'result.failed': 'failed',
  'result.close': 'Close',
  'result.open': 'Open folder',

  'common.andMore': '…and {count} more',

  'dialog.selectFoldersTitle': 'Choose folders with files',
  'dialog.selectFoldersButton': 'Add',
  'dialog.selectDestinationTitle': 'Where to put the files',
  'dialog.selectDestinationButton': 'Choose folder',

  'error.alreadyRunning': 'A transfer is already running',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s'
}
