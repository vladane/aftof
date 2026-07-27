import type { Dictionary } from './ru'

export const de: Dictionary = {
  'app.tagline': 'Sammelt Dateien aus vielen Ordnern in einem',
  'app.windowTitle': 'Aftof — Dateien sammeln',

  'theme.toLight': 'Helles Design',
  'theme.toDark': 'Dunkles Design',
  'language.title': 'Sprache der Oberfläche',

  'about.open': 'Über das Programm und Unterstützung',
  'about.version': 'Version {version}',
  'about.author': 'Autor',
  'about.legal': '© {year} {author} · MIT-Lizenz',
  'about.github': 'Quellcode auf GitHub',

  'support.title': 'Entwicklung unterstützen',
  'support.text':
    'Aftof ist kostenlos. Wenn es Ihnen Zeit gespart hat, können Sie die Arbeit unterstützen — so entstehen neue Versionen.',
  'support.boostyHint': 'Russische Bankkarten und SBP',
  'support.donationAlertsHint': 'Kartenzahlung aus anderen Ländern',
  'support.cryptoTitle': 'Kryptowährung',
  'support.cryptoHint': 'USDT — Netzwerk wählen und Adresse kopieren',
  'support.copy': 'Adresse kopieren',
  'support.copied': 'Adresse kopiert',

  'drop.hint': 'Loslassen, um Ordner hinzuzufügen',

  'sources.title': 'Quellordner',
  'sources.clear': 'Leeren',
  'sources.add': 'Ordner hinzufügen',
  'sources.empty':
    'Wählen Sie mehrere Ordner auf einmal aus oder ziehen Sie sie ins Fenster — die Dateien aller Ordner landen in einer Liste.',
  'sources.scanning': 'wird gescannt…',
  'sources.remove': 'Ordner entfernen',
  'sources.fileCount': { one: '{count} Datei', other: '{count} Dateien' },

  'scan.title': 'Wonach suchen',
  'scan.rescan': 'Erneut scannen',
  'scan.recursive': 'Unterordner einbeziehen',
  'scan.recursiveHint': 'Dateien in verschachtelten Ordnern suchen',
  'scan.hidden': 'Versteckte Dateien',
  'scan.hiddenHint': 'Dateien, deren Name mit einem Punkt beginnt',
  'scan.errorsTitle': 'Nicht lesbar',

  'place.title': 'Wie ablegen',
  'place.keepStructure': 'Unterordner beibehalten',
  'place.keepStructureHint': 'Sonst landen alle Dateien in einem Ordner',
  'place.conflict': 'Wenn der Name belegt ist',

  'conflict.rename': 'Umbenennen',
  'conflict.skip': 'Überspringen',
  'conflict.overwrite': 'Ersetzen',
  'conflict.renameHint': 'Dem Namen wird eine Nummer angehängt: „Foto (2).jpg“',
  'conflict.skipHint': 'Die vorhandene Datei bleibt unberührt',
  'conflict.overwriteHint': 'Die vorhandene Datei wird überschrieben',

  'search.placeholder': 'Nach Dateinamen suchen',

  'category.all': 'Alle',
  'category.image': 'Fotos',
  'category.video': 'Videos',
  'category.audio': 'Audio',
  'category.document': 'Dokumente',
  'category.archive': 'Archive',
  'category.other': 'Sonstiges',

  'list.selectAll': 'Alle auswählen',
  'list.deselectAll': 'Auswahl aufheben',
  'list.count': { one: '{count} Datei', other: '{count} Dateien' },
  'list.countOf': ' von {total}',

  'empty.scanningTitle': 'Ordner werden gescannt…',
  'empty.scanningText': 'Das dauert ein paar Sekunden',
  'empty.title': 'Noch nichts da',
  'empty.text':
    'Fügen Sie links Ordner hinzu oder ziehen Sie sie hierher — die Dateien erscheinen in dieser Liste',
  'empty.noMatchTitle': 'Nichts gefunden',
  'empty.noMatchText': 'Ändern Sie die Suche oder entfernen Sie den Typfilter',

  'dest.label': 'Zielordner',
  'dest.placeholder': 'Ordner wählen',
  'mode.copy': 'Kopieren',
  'mode.move': 'Verschieben',
  'warn.destIsSource': 'Der Zielordner ist zugleich Quelle',
  'summary.selected': {
    one: '{count} Datei ausgewählt · {size}',
    other: '{count} Dateien ausgewählt · {size}'
  },
  'summary.fromFolders': {
    one: ' · aus {count} Ordner',
    other: ' · aus {count} Ordnern'
  },
  'action.copy': 'Kopieren',
  'action.move': 'Verschieben',

  'transfer.title': 'Dateien werden übertragen',
  'transfer.preparing': 'Vorbereitung…',
  'transfer.progressCount': '{processed} von {total}',
  'transfer.stop': 'Anhalten',

  'result.cancelled': 'Übertragung angehalten',
  'result.done': 'Fertig',
  'result.summaryCopy': {
    one: '{count} Datei in „{folder}“ kopiert in {duration}',
    other: '{count} Dateien in „{folder}“ kopiert in {duration}'
  },
  'result.summaryMove': {
    one: '{count} Datei nach „{folder}“ verschoben in {duration}',
    other: '{count} Dateien nach „{folder}“ verschoben in {duration}'
  },
  'result.success': 'erfolgreich',
  'result.skipped': 'übersprungen',
  'result.failed': 'fehlgeschlagen',
  'result.close': 'Schließen',
  'result.open': 'Ordner öffnen',

  'common.andMore': '…und {count} weitere',

  'dialog.selectFoldersTitle': 'Ordner mit Dateien wählen',
  'dialog.selectFoldersButton': 'Hinzufügen',
  'dialog.selectDestinationTitle': 'Wohin mit den Dateien',
  'dialog.selectDestinationButton': 'Ordner wählen',

  'error.alreadyRunning': 'Eine Übertragung läuft bereits',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} s',
  'duration.minutesSeconds': '{minutes} Min. {seconds} s'
}
