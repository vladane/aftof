import type { Dictionary } from './ru'

export const pt: Dictionary = {
  'app.tagline': 'Reúne ficheiros de várias pastas numa só',
  'app.windowTitle': 'Aftof — coletor de ficheiros',

  'theme.toLight': 'Tema claro',
  'theme.toDark': 'Tema escuro',
  'language.title': 'Idioma da interface',

  'about.open': 'Sobre o programa e apoio',
  'about.version': 'Versão {version}',
  'about.author': 'Autor',
  'about.legal': '© {year} {author} · licença MIT',
  'about.github': 'Código-fonte no GitHub',

  'support.title': 'Apoiar o desenvolvimento',
  'support.text':
    'O Aftof é gratuito. Se lhe poupou tempo, pode apoiar o trabalho — é assim que saem novas versões.',
  'support.boostyHint': 'Cartões de bancos russos e SBP',
  'support.donationAlertsHint': 'Pagamento com cartão de outros países',
  'support.cryptoTitle': 'Criptomoeda',
  'support.cryptoHint': 'USDT — escolha a rede e copie o endereço',
  'support.copy': 'Copiar endereço',
  'support.copied': 'Endereço copiado',

  'drop.hint': 'Solte para adicionar as pastas',

  'sources.title': 'Pastas de origem',
  'sources.clear': 'Limpar',
  'sources.add': 'Adicionar pastas',
  'sources.empty':
    'Escolha várias pastas de uma vez ou arraste-as para a janela — os ficheiros de todas elas ficam numa única lista.',
  'sources.scanning': 'a analisar…',
  'sources.remove': 'Remover pasta',
  'sources.fileCount': { one: '{count} ficheiro', other: '{count} ficheiros' },

  'scan.title': 'O que procurar',
  'scan.rescan': 'Analisar novamente',
  'scan.recursive': 'Incluir subpastas',
  'scan.recursiveHint': 'Procurar ficheiros em pastas aninhadas',
  'scan.hidden': 'Ficheiros ocultos',
  'scan.hiddenHint': 'Ficheiros cujo nome começa por um ponto',
  'scan.errorsTitle': 'Não foi possível ler',

  'place.title': 'Como organizar',
  'place.keepStructure': 'Manter as subpastas',
  'place.keepStructureHint': 'Caso contrário, todos os ficheiros vão para uma única pasta',
  'place.conflict': 'Se o nome já existir',

  'conflict.rename': 'Renomear',
  'conflict.skip': 'Ignorar',
  'conflict.overwrite': 'Substituir',
  'conflict.renameHint': 'É acrescentado um número ao nome: «foto (2).jpg»',
  'conflict.skipHint': 'O ficheiro existente fica intacto',
  'conflict.overwriteHint': 'O ficheiro existente será substituído',

  'search.placeholder': 'Procurar por nome do ficheiro',

  'category.all': 'Todos',
  'category.image': 'Fotos',
  'category.video': 'Vídeo',
  'category.audio': 'Áudio',
  'category.document': 'Documentos',
  'category.archive': 'Arquivos',
  'category.other': 'Outros',

  'list.selectAll': 'Selecionar tudo',
  'list.deselectAll': 'Desmarcar tudo',
  'list.count': { one: '{count} ficheiro', other: '{count} ficheiros' },
  'list.countOf': ' de {total}',

  'empty.scanningTitle': 'A analisar as pastas…',
  'empty.scanningText': 'Demora alguns segundos',
  'empty.title': 'Ainda não há nada',
  'empty.text':
    'Adicione pastas à esquerda ou arraste-as para aqui — os ficheiros aparecerão nesta lista',
  'empty.noMatchTitle': 'Nada encontrado',
  'empty.noMatchText': 'Altere a pesquisa ou remova o filtro por tipo',

  'dest.label': 'Destino',
  'dest.placeholder': 'Escolher uma pasta',
  'mode.copy': 'Copiar',
  'mode.move': 'Mover',
  'warn.destIsSource': 'A pasta de destino também é uma origem',
  'summary.selected': {
    one: '{count} ficheiro selecionado · {size}',
    other: '{count} ficheiros selecionados · {size}'
  },
  'summary.fromFolders': {
    one: ' · de {count} pasta',
    other: ' · de {count} pastas'
  },
  'action.copy': 'Copiar',
  'action.move': 'Mover',

  'transfer.title': 'A transferir ficheiros',
  'transfer.preparing': 'A preparar…',
  'transfer.progressCount': '{processed} de {total}',
  'transfer.stop': 'Parar',

  'result.cancelled': 'Transferência interrompida',
  'result.done': 'Concluído',
  'result.summaryCopy': {
    one: '{count} ficheiro copiado para «{folder}» em {duration}',
    other: '{count} ficheiros copiados para «{folder}» em {duration}'
  },
  'result.summaryMove': {
    one: '{count} ficheiro movido para «{folder}» em {duration}',
    other: '{count} ficheiros movidos para «{folder}» em {duration}'
  },
  'result.success': 'com êxito',
  'result.skipped': 'ignorados',
  'result.failed': 'com erro',
  'result.close': 'Fechar',
  'result.open': 'Abrir pasta',

  'common.andMore': '…e mais {count}',

  'dialog.selectFoldersTitle': 'Escolha as pastas com ficheiros',
  'dialog.selectFoldersButton': 'Adicionar',
  'dialog.selectDestinationTitle': 'Onde colocar os ficheiros',
  'dialog.selectDestinationButton': 'Escolher pasta',

  'error.alreadyRunning': 'Já está a decorrer uma transferência',

  'unit.byte': 'B',
  'unit.kilobyte': 'KB',
  'unit.megabyte': 'MB',
  'unit.gigabyte': 'GB',
  'unit.terabyte': 'TB',

  'duration.seconds': '{value} s',
  'duration.minutesSeconds': '{minutes} min {seconds} s'
}
