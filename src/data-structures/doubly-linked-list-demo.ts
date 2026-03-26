import { ListaDupla } from './doubly-linked-list';

function printSection(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function formatNodeValue(value: string | null): string {
  return value === null ? 'null' : value;
}

export function runDoublyLinkedListDemo(): void {
  const playlist = new ListaDupla();

  printSection('Estado inicial');
  console.log(`vazia(): ${playlist.vazia()}`);
  console.log(`comprimento(): ${playlist.comprimento()}`);
  console.log(`toString(): "${playlist.toString()}"`);

  printSection('Insercao no fim');
  playlist.insereFim('Seek and Destroy');
  playlist.insereFim("Rock and Roll Ain't Noise Pollution");
  playlist.insereFim('Sabbath Bloody Sabbath');
  console.log(playlist.toString());

  printSection('Insercao no inicio e por posicao');
  playlist.insere('War Pigs');
  playlist.inserePosicao('Good Times Bad Times', 3);
  console.log(playlist.toString());

  printSection('Busca e ultimo');
  console.log(
    `busca("Sabbath Bloody Sabbath"): ${formatNodeValue(
      playlist.busca('Sabbath Bloody Sabbath')?.getInfo() ?? null,
    )}`,
  );
  console.log(`ultimo(): ${formatNodeValue(playlist.ultimo()?.getInfo() ?? null)}`);

  printSection('Remove por titulo e por posicao');
  playlist.retira('War Pigs');
  playlist.retiraPosicao(2);
  console.log(playlist.toString());

  printSection('Move musica');
  playlist.move(2, 1);
  console.log(playlist.toString());

  printSection('Playlist numerada');
  playlist.imprimeNumerada();

  printSection('Libera lista');
  playlist.libera();
  console.log(`vazia(): ${playlist.vazia()}`);
  console.log(`comprimento(): ${playlist.comprimento()}`);
  console.log(`toString(): "${playlist.toString()}"`);
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return (
    currentEntryFile.endsWith('doubly-linked-list-demo.ts') ||
    currentEntryFile.endsWith('doubly-linked-list-demo.js')
  );
}

if (isDirectExecution()) {
  runDoublyLinkedListDemo();
}

// npm run build && node dist/data-structures/doubly-linked-list-demo.js
// para executar a demonstracao.
