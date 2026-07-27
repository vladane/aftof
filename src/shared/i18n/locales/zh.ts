import type { Dictionary } from './ru'

export const zh: Dictionary = {
  'app.tagline': '把多个文件夹里的文件汇集到一个文件夹',
  'app.windowTitle': 'Aftof — 文件汇集',

  'theme.toLight': '浅色主题',
  'theme.toDark': '深色主题',
  'language.title': '界面语言',

  'about.open': '关于与支持',
  'about.version': '版本 {version}',
  'about.author': '作者',
  'about.legal': '© {year} {author} · MIT 许可证',
  'about.github': 'GitHub 上的源代码',

  'support.title': '支持开发',
  'support.text': 'Aftof 是免费的。如果它为你节省了时间，欢迎支持一下——这样才能持续更新。',
  'support.boostyHint': '俄罗斯银行卡与 SBP',
  'support.donationAlertsHint': '其他国家的银行卡支付',
  'support.cryptoTitle': '加密货币',
  'support.cryptoHint': 'USDT — 选择网络并复制地址',
  'support.copy': '复制地址',
  'support.copied': '地址已复制',

  'drop.hint': '松开即可添加文件夹',

  'sources.title': '来源文件夹',
  'sources.clear': '清空',
  'sources.add': '添加文件夹',
  'sources.empty': '一次可选择多个文件夹，也可以直接拖入窗口——所有文件夹里的文件会汇成一个列表。',
  'sources.scanning': '扫描中…',
  'sources.remove': '移除文件夹',
  'sources.fileCount': { other: '{count} 个文件' },

  'scan.title': '查找范围',
  'scan.rescan': '重新扫描',
  'scan.recursive': '包含子文件夹',
  'scan.recursiveHint': '在嵌套的文件夹中查找文件',
  'scan.hidden': '隐藏文件',
  'scan.hiddenHint': '文件名以点开头的文件',
  'scan.errorsTitle': '无法读取',

  'place.title': '存放方式',
  'place.keepStructure': '保留子文件夹',
  'place.keepStructureHint': '否则所有文件都会放进同一个文件夹',
  'place.conflict': '若名称已存在',

  'conflict.rename': '重命名',
  'conflict.skip': '跳过',
  'conflict.overwrite': '替换',
  'conflict.renameHint': '会在名称后加编号：“照片 (2).jpg”',
  'conflict.skipHint': '已有的文件保持不变',
  'conflict.overwriteHint': '已有的文件将被覆盖',

  'search.placeholder': '按文件名搜索',

  'category.all': '全部',
  'category.image': '照片',
  'category.video': '视频',
  'category.audio': '音频',
  'category.document': '文档',
  'category.archive': '压缩包',
  'category.other': '其他',

  'list.selectAll': '全选',
  'list.deselectAll': '取消全选',
  'list.count': { other: '{count} 个文件' },
  'list.countOf': '，共 {total} 个',

  'empty.scanningTitle': '正在扫描文件夹…',
  'empty.scanningText': '需要几秒钟',
  'empty.title': '暂时还没有内容',
  'empty.text': '在左侧添加文件夹，或直接拖到这里——文件会出现在此列表中',
  'empty.noMatchTitle': '没有找到内容',
  'empty.noMatchText': '请修改搜索词或取消类型筛选',

  'dest.label': '目标位置',
  'dest.placeholder': '选择文件夹',
  'mode.copy': '复制',
  'mode.move': '移动',
  'warn.destIsSource': '目标文件夹同时也是来源文件夹',
  'summary.selected': { other: '已选择 {count} 个文件 · {size}' },
  'summary.fromFolders': { other: ' · 来自 {count} 个文件夹' },
  'action.copy': '复制',
  'action.move': '移动',

  'transfer.title': '正在传输文件',
  'transfer.preparing': '准备中…',
  'transfer.progressCount': '{processed} / {total}',
  'transfer.stop': '停止',

  'result.cancelled': '传输已停止',
  'result.done': '完成',
  'result.summaryCopy': { other: '已将 {count} 个文件复制到“{folder}”，用时 {duration}' },
  'result.summaryMove': { other: '已将 {count} 个文件移动到“{folder}”，用时 {duration}' },
  'result.success': '成功',
  'result.skipped': '已跳过',
  'result.failed': '失败',
  'result.close': '关闭',
  'result.open': '打开文件夹',

  'common.andMore': '…还有 {count} 项',

  'dialog.selectFoldersTitle': '选择包含文件的文件夹',
  'dialog.selectFoldersButton': '添加',
  'dialog.selectDestinationTitle': '文件存放到哪里',
  'dialog.selectDestinationButton': '选择文件夹',

  'error.alreadyRunning': '已有传输正在进行',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} 秒',
  'duration.minutesSeconds': '{minutes} 分 {seconds} 秒'
}
