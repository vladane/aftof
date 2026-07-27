import type { Dictionary } from './ru'

export const es: Dictionary = {
  'app.tagline': 'Reúne archivos de muchas carpetas en una sola',
  'app.windowTitle': 'Aftof — recopilador de archivos',

  'theme.toLight': 'Tema claro',
  'theme.toDark': 'Tema oscuro',
  'language.title': 'Idioma de la interfaz',

  'about.open': 'Acerca del programa y apoyo',
  'about.version': 'Versión {version}',
  'about.author': 'Autor',
  'about.legal': '© {year} {author} · licencia MIT',
  'about.github': 'Código fuente en GitHub',

  'support.title': 'Apoyar el desarrollo',
  'support.text':
    'Aftof es gratuito. Si te ha ahorrado tiempo, puedes apoyar el trabajo: así siguen saliendo nuevas versiones.',
  'support.boostyHint': 'Tarjetas de bancos rusos y SBP',
  'support.donationAlertsHint': 'Pago con tarjeta desde otros países',
  'support.cryptoTitle': 'Criptomonedas',
  'support.cryptoHint': 'USDT: elige una red y copia la dirección',
  'support.copy': 'Copiar dirección',
  'support.copied': 'Dirección copiada',

  'drop.hint': 'Suelta para añadir carpetas',

  'sources.title': 'Carpetas de origen',
  'sources.clear': 'Vaciar',
  'sources.add': 'Añadir carpetas',
  'sources.empty':
    'Elige varias carpetas a la vez o arrástralas a la ventana: los archivos de todas ellas se reunirán en una lista.',
  'sources.scanning': 'analizando…',
  'sources.remove': 'Quitar carpeta',
  'sources.fileCount': { one: '{count} archivo', other: '{count} archivos' },

  'scan.title': 'Qué buscar',
  'scan.rescan': 'Volver a analizar',
  'scan.recursive': 'Incluir subcarpetas',
  'scan.recursiveHint': 'Buscar archivos en carpetas anidadas',
  'scan.hidden': 'Archivos ocultos',
  'scan.hiddenHint': 'Archivos cuyo nombre empieza por un punto',
  'scan.errorsTitle': 'No se pudo leer',

  'place.title': 'Cómo colocarlos',
  'place.keepStructure': 'Mantener subcarpetas',
  'place.keepStructureHint': 'Si no, todos los archivos irán a una sola carpeta',
  'place.conflict': 'Si el nombre ya existe',

  'conflict.rename': 'Renombrar',
  'conflict.skip': 'Omitir',
  'conflict.overwrite': 'Reemplazar',
  'conflict.renameHint': 'Se añade un número al nombre: «foto (2).jpg»',
  'conflict.skipHint': 'El archivo existente queda intacto',
  'conflict.overwriteHint': 'El archivo existente se sobrescribirá',

  'search.placeholder': 'Buscar por nombre de archivo',

  'category.all': 'Todos',
  'category.image': 'Fotos',
  'category.video': 'Vídeo',
  'category.audio': 'Audio',
  'category.document': 'Documentos',
  'category.archive': 'Archivos comprimidos',
  'category.other': 'Otros',

  'list.selectAll': 'Seleccionar todo',
  'list.deselectAll': 'Anular selección',
  'list.count': { one: '{count} archivo', other: '{count} archivos' },
  'list.countOf': ' de {total}',

  'empty.scanningTitle': 'Analizando carpetas…',
  'empty.scanningText': 'Tardará un par de segundos',
  'empty.title': 'Aún no hay nada',
  'empty.text':
    'Añade carpetas a la izquierda o arrástralas aquí: los archivos aparecerán en esta lista',
  'empty.noMatchTitle': 'No se encontró nada',
  'empty.noMatchText': 'Cambia la búsqueda o quita el filtro por tipo',

  'dest.label': 'Destino',
  'dest.placeholder': 'Elige una carpeta',
  'mode.copy': 'Copiar',
  'mode.move': 'Mover',
  'warn.destIsSource': 'La carpeta de destino también es de origen',
  'summary.selected': {
    one: '{count} archivo seleccionado · {size}',
    other: '{count} archivos seleccionados · {size}'
  },
  'summary.fromFolders': {
    one: ' · de {count} carpeta',
    other: ' · de {count} carpetas'
  },
  'action.copy': 'Copiar',
  'action.move': 'Mover',

  'transfer.title': 'Transfiriendo archivos',
  'transfer.preparing': 'Preparando…',
  'transfer.progressCount': '{processed} de {total}',
  'transfer.stop': 'Detener',

  'result.cancelled': 'Transferencia detenida',
  'result.done': 'Listo',
  'result.summaryCopy': {
    one: '{count} archivo copiado en «{folder}» en {duration}',
    other: '{count} archivos copiados en «{folder}» en {duration}'
  },
  'result.summaryMove': {
    one: '{count} archivo movido a «{folder}» en {duration}',
    other: '{count} archivos movidos a «{folder}» en {duration}'
  },
  'result.success': 'con éxito',
  'result.skipped': 'omitidos',
  'result.failed': 'con error',
  'result.close': 'Cerrar',
  'result.open': 'Abrir carpeta',

  'common.andMore': '…y {count} más',

  'dialog.selectFoldersTitle': 'Elige carpetas con archivos',
  'dialog.selectFoldersButton': 'Añadir',
  'dialog.selectDestinationTitle': 'Dónde poner los archivos',
  'dialog.selectDestinationButton': 'Elegir carpeta',

  'error.alreadyRunning': 'Ya hay una transferencia en curso',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s'
}
