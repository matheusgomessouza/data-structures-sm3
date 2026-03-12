import { Lista } from './single-linked-list';

function printSection(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function formatNodeValue(value: number | null): string {
  return value === null ? 'null' : `${value}`;
}

export function runSingleLinkedListDemo(): void {
  const lista = new Lista();

  printSection('Estado inicial');
  console.log(`vazia(): ${lista.vazia()}`);
  console.log(`comprimento(): ${lista.comprimento()}`);
  console.log(`toString(): "${lista.toString()}"`);

  printSection('Insercoes no inicio');
  const valuesToInsert = [10, 20, 30];

  for (const value of valuesToInsert) {
    lista.insere(value);
    console.log(`insere(${value}) -> ${lista.toString()}`);
  }

  printSection('Busca');
  const search20 = lista.busca(20);
  const search99 = lista.busca(99);

  console.log(`busca(20): ${formatNodeValue(search20?.getInfo() ?? null)}`);
  console.log(`busca(99): ${formatNodeValue(search99?.getInfo() ?? null)}`);

  printSection('Ultimo e comprimento');
  console.log(`ultimo(): ${formatNodeValue(lista.ultimo()?.getInfo() ?? null)}`);
  console.log(`comprimento(): ${lista.comprimento()}`);

  printSection('Retira');
  lista.retira(20);
  console.log(`retira(20) -> ${lista.toString()}`);
  lista.retira(999);
  console.log(`retira(999) -> ${lista.toString()}`);

  printSection('Imprime');
  process.stdout.write('imprime(): ');
  lista.imprime();

  printSection('Libera');
  lista.libera();
  console.log(`vazia(): ${lista.vazia()}`);
  console.log(`comprimento(): ${lista.comprimento()}`);
  console.log(`toString(): "${lista.toString()}"`);
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return (
    currentEntryFile.endsWith('single-linked-list-demo.ts') ||
    currentEntryFile.endsWith('single-linked-list-demo.js')
  );
}

if (isDirectExecution()) {
  runSingleLinkedListDemo();
}

// npm run build && node dist/data-structures/single-linked-list-demo.js
// para executar a demonstracao.
