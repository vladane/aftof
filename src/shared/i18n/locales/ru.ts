import type { MessageValue } from '../types'

/** Русский — эталонный словарь: набор его ключей обязателен для остальных языков. */
export const ru = {
  'app.tagline': 'Собирает файлы из множества папок в одну',
  'app.windowTitle': 'Aftof — сбор файлов',

  'theme.toLight': 'Светлая тема',
  'theme.toDark': 'Тёмная тема',
  'language.title': 'Язык интерфейса',

  'about.open': 'О программе и поддержка',
  'about.version': 'Версия {version}',
  'about.author': 'Автор',
  'about.legal': '© {year} {author} · лицензия MIT',
  'about.github': 'Исходный код на GitHub',

  'support.title': 'Поддержать разработку',
  'support.text':
    'Aftof бесплатный. Если он сэкономил вам время, поддержите разработку — так появляются новые версии.',
  'support.boostyHint': 'Карты российских банков и СБП',
  'support.donationAlertsHint': 'Оплата картами из других стран',
  'support.cryptoTitle': 'Криптовалюта',
  'support.cryptoHint': 'USDT — выберите сеть и скопируйте адрес',
  'support.copy': 'Скопировать адрес',
  'support.copied': 'Адрес скопирован',

  'drop.hint': 'Отпустите, чтобы добавить папки',

  'sources.title': 'Откуда брать',
  'sources.clear': 'Очистить',
  'sources.add': 'Добавить папки',
  'sources.empty':
    'Выберите несколько папок сразу или перетащите их в окно — файлы из всех папок соберутся в один список.',
  'sources.scanning': 'сканирование…',
  'sources.remove': 'Убрать папку',
  'sources.fileCount': {
    one: '{count} файл',
    few: '{count} файла',
    many: '{count} файлов',
    other: '{count} файла'
  },

  'scan.title': 'Что искать',
  'scan.rescan': 'Пересканировать',
  'scan.recursive': 'Включая подпапки',
  'scan.recursiveHint': 'Искать файлы во вложенных папках',
  'scan.hidden': 'Скрытые файлы',
  'scan.hiddenHint': 'Файлы, имя которых начинается с точки',
  'scan.errorsTitle': 'Не удалось прочитать',

  'place.title': 'Как складывать',
  'place.keepStructure': 'Сохранить подпапки',
  'place.keepStructureHint': 'Иначе все файлы лягут в одну папку',
  'place.conflict': 'Если имя занято',

  'conflict.rename': 'Переименовать',
  'conflict.skip': 'Пропустить',
  'conflict.overwrite': 'Заменить',
  'conflict.renameHint': 'К имени добавится номер: «фото (2).jpg»',
  'conflict.skipHint': 'Файл с таким именем останется нетронутым',
  'conflict.overwriteHint': 'Существующий файл будет перезаписан',

  'search.placeholder': 'Поиск по имени файла',

  'category.all': 'Все',
  'category.image': 'Фото',
  'category.video': 'Видео',
  'category.audio': 'Аудио',
  'category.document': 'Документы',
  'category.archive': 'Архивы',
  'category.other': 'Прочее',

  'list.selectAll': 'Выбрать все',
  'list.deselectAll': 'Снять выделение',
  'list.count': {
    one: '{count} файл',
    few: '{count} файла',
    many: '{count} файлов',
    other: '{count} файла'
  },
  'list.countOf': ' из {total}',

  'empty.scanningTitle': 'Сканируем папки…',
  'empty.scanningText': 'Это займёт пару секунд',
  'empty.title': 'Пока пусто',
  'empty.text': 'Добавьте папки слева или перетащите их сюда — файлы появятся в этом списке',
  'empty.noMatchTitle': 'Ничего не найдено',
  'empty.noMatchText': 'Измените запрос или снимите фильтр по типу',

  'dest.label': 'Куда сложить',
  'dest.placeholder': 'Выберите папку',
  'mode.copy': 'Копировать',
  'mode.move': 'Переместить',
  'warn.destIsSource': 'Папка назначения совпадает с источником',
  'summary.selected': {
    one: 'Выбран {count} файл · {size}',
    few: 'Выбрано {count} файла · {size}',
    many: 'Выбрано {count} файлов · {size}',
    other: 'Выбрано {count} файла · {size}'
  },
  'summary.fromFolders': {
    one: ' · из {count} папки',
    few: ' · из {count} папок',
    many: ' · из {count} папок',
    other: ' · из {count} папок'
  },
  'action.copy': 'Скопировать',
  'action.move': 'Переместить',

  'transfer.title': 'Переносим файлы',
  'transfer.preparing': 'Подготовка…',
  'transfer.progressCount': '{processed} из {total}',
  'transfer.stop': 'Остановить',

  'result.cancelled': 'Перенос остановлен',
  'result.done': 'Готово',
  'result.summaryCopy': {
    one: '{count} файл скопирован в «{folder}» за {duration}',
    few: '{count} файла скопировано в «{folder}» за {duration}',
    many: '{count} файлов скопировано в «{folder}» за {duration}',
    other: '{count} файла скопировано в «{folder}» за {duration}'
  },
  'result.summaryMove': {
    one: '{count} файл перенесён в «{folder}» за {duration}',
    few: '{count} файла перенесено в «{folder}» за {duration}',
    many: '{count} файлов перенесено в «{folder}» за {duration}',
    other: '{count} файла перенесено в «{folder}» за {duration}'
  },
  'result.success': 'успешно',
  'result.skipped': 'пропущено',
  'result.failed': 'с ошибкой',
  'result.close': 'Закрыть',
  'result.open': 'Открыть папку',

  'common.andMore': '…и ещё {count}',

  'dialog.selectFoldersTitle': 'Выберите папки с файлами',
  'dialog.selectFoldersButton': 'Добавить',
  'dialog.selectDestinationTitle': 'Куда сложить файлы',
  'dialog.selectDestinationButton': 'Выбрать папку',

  'error.alreadyRunning': 'Перенос уже выполняется',

  'unit.byte': 'Б',
  'unit.kilobyte': 'КБ',
  'unit.megabyte': 'МБ',
  'unit.gigabyte': 'ГБ',
  'unit.terabyte': 'ТБ',

  'duration.seconds': '{value} с',
  'duration.minutesSeconds': '{minutes} мин {seconds} с'
} satisfies Record<string, MessageValue>

export type MessageKey = keyof typeof ru
export type Dictionary = Record<MessageKey, MessageValue>
