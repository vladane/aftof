import type { Dictionary } from './ru'

export const fr: Dictionary = {
  'app.tagline': 'Rassemble les fichiers de plusieurs dossiers dans un seul',
  'app.windowTitle': 'Aftof — collecteur de fichiers',

  'theme.toLight': 'Thème clair',
  'theme.toDark': 'Thème sombre',
  'language.title': "Langue de l'interface",

  'about.open': 'À propos et soutien',
  'about.version': 'Version {version}',
  'about.author': 'Auteur',
  'about.legal': '© {year} {author} · licence MIT',
  'about.github': 'Code source sur GitHub',

  'support.title': 'Soutenir le développement',
  'support.text':
    'Aftof est gratuit. S’il vous a fait gagner du temps, vous pouvez soutenir le projet : c’est ce qui permet de sortir de nouvelles versions.',
  'support.boostyHint': 'Cartes bancaires russes et SBP',
  'support.donationAlertsHint': 'Paiement par carte depuis d’autres pays',
  'support.cryptoTitle': 'Cryptomonnaie',
  'support.cryptoHint': 'USDT — choisissez un réseau et copiez l’adresse',
  'support.copy': 'Copier l’adresse',
  'support.copied': 'Adresse copiée',

  'drop.hint': 'Relâchez pour ajouter les dossiers',

  'sources.title': 'Dossiers source',
  'sources.clear': 'Vider',
  'sources.add': 'Ajouter des dossiers',
  'sources.empty':
    'Sélectionnez plusieurs dossiers à la fois ou faites-les glisser dans la fenêtre : leurs fichiers formeront une seule liste.',
  'sources.scanning': 'analyse…',
  'sources.remove': 'Retirer le dossier',
  'sources.fileCount': { one: '{count} fichier', other: '{count} fichiers' },

  'scan.title': 'Que chercher',
  'scan.rescan': 'Relancer l’analyse',
  'scan.recursive': 'Inclure les sous-dossiers',
  'scan.recursiveHint': 'Chercher les fichiers dans les dossiers imbriqués',
  'scan.hidden': 'Fichiers masqués',
  'scan.hiddenHint': 'Fichiers dont le nom commence par un point',
  'scan.errorsTitle': 'Lecture impossible',

  'place.title': 'Comment les ranger',
  'place.keepStructure': 'Conserver les sous-dossiers',
  'place.keepStructureHint': 'Sinon tous les fichiers iront dans un seul dossier',
  'place.conflict': 'Si le nom existe déjà',

  'conflict.rename': 'Renommer',
  'conflict.skip': 'Ignorer',
  'conflict.overwrite': 'Remplacer',
  'conflict.renameHint': 'Un numéro est ajouté au nom : « photo (2).jpg »',
  'conflict.skipHint': 'Le fichier existant reste intact',
  'conflict.overwriteHint': 'Le fichier existant sera écrasé',

  'search.placeholder': 'Rechercher par nom de fichier',

  'category.all': 'Tous',
  'category.image': 'Photos',
  'category.video': 'Vidéos',
  'category.audio': 'Audio',
  'category.document': 'Documents',
  'category.archive': 'Archives',
  'category.other': 'Autres',

  'list.selectAll': 'Tout sélectionner',
  'list.deselectAll': 'Tout désélectionner',
  'list.count': { one: '{count} fichier', other: '{count} fichiers' },
  'list.countOf': ' sur {total}',

  'empty.scanningTitle': 'Analyse des dossiers…',
  'empty.scanningText': 'Cela prend quelques secondes',
  'empty.title': 'Rien pour le moment',
  'empty.text':
    'Ajoutez des dossiers à gauche ou faites-les glisser ici : les fichiers apparaîtront dans cette liste',
  'empty.noMatchTitle': 'Aucun résultat',
  'empty.noMatchText': 'Modifiez la recherche ou retirez le filtre par type',

  'dest.label': 'Destination',
  'dest.placeholder': 'Choisir un dossier',
  'mode.copy': 'Copier',
  'mode.move': 'Déplacer',
  'warn.destIsSource': 'Le dossier de destination est aussi une source',
  'summary.selected': {
    one: '{count} fichier sélectionné · {size}',
    other: '{count} fichiers sélectionnés · {size}'
  },
  'summary.fromFolders': {
    one: ' · de {count} dossier',
    other: ' · de {count} dossiers'
  },
  'action.copy': 'Copier',
  'action.move': 'Déplacer',

  'transfer.title': 'Transfert des fichiers',
  'transfer.preparing': 'Préparation…',
  'transfer.progressCount': '{processed} sur {total}',
  'transfer.stop': 'Arrêter',

  'result.cancelled': 'Transfert arrêté',
  'result.done': 'Terminé',
  'result.summaryCopy': {
    one: '{count} fichier copié dans « {folder} » en {duration}',
    other: '{count} fichiers copiés dans « {folder} » en {duration}'
  },
  'result.summaryMove': {
    one: '{count} fichier déplacé vers « {folder} » en {duration}',
    other: '{count} fichiers déplacés vers « {folder} » en {duration}'
  },
  'result.success': 'réussis',
  'result.skipped': 'ignorés',
  'result.failed': 'en échec',
  'result.close': 'Fermer',
  'result.open': 'Ouvrir le dossier',

  'common.andMore': '…et {count} de plus',

  'dialog.selectFoldersTitle': 'Choisissez les dossiers contenant les fichiers',
  'dialog.selectFoldersButton': 'Ajouter',
  'dialog.selectDestinationTitle': 'Où placer les fichiers',
  'dialog.selectDestinationButton': 'Choisir le dossier',

  'error.alreadyRunning': 'Un transfert est déjà en cours',

  'unit.byte': 'o',
  'unit.kilobyte': 'Ko',
  'unit.megabyte': 'Mo',
  'unit.gigabyte': 'Go',
  'unit.terabyte': 'To',

  'duration.seconds': '{value} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s'
}
