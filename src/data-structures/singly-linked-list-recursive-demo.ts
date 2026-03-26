import { Lista } from './singly-linked-list-recursive';

function printSection(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function formatNodeValue(value: number | null): string {
  return value === null ? 'null' : `${value}`;
}

function buildList(values: number[]): Lista {
  const lista = new Lista();

  for (const value of values) {
    lista.insereFim(value);
  }

  return lista;
}

export function runSingleLinkedListRecursiveDemo(): void {
  const lista = new Lista();

  printSection('Estado inicial');
  console.log(`vazia(): ${lista.vazia()}`);
  console.log(`comprimento(): ${lista.comprimento()}`);
  console.log(`comprimentoRecursivo(): ${lista.comprimentoRecursivo()}`);
  console.log(`toString(): "${lista.toString()}"`);

  printSection('Insercoes no fim');
  const valuesToInsert = [10, 20, 30];

  for (const value of valuesToInsert) {
    lista.insereFim(value);
    console.log(`insereFim(${value}) -> ${lista.toString()}`);
  }

  printSection('Insercao no inicio');
  lista.insere(5);
  console.log(`insere(5) -> ${lista.toString()}`);

  printSection('Busca e ultimo');
  const search20 = lista.busca(20);
  const search99 = lista.busca(99);

  console.log(`busca(20): ${formatNodeValue(search20?.getInfo() ?? null)}`);
  console.log(`busca(99): ${formatNodeValue(search99?.getInfo() ?? null)}`);
  console.log(`ultimo(): ${formatNodeValue(lista.ultimo()?.getInfo() ?? null)}`);

  printSection('Impressao recursiva');
  process.stdout.write('imprimeRecursivo(): ');
  lista.imprimeRecursivo();

  printSection('Retira recursivo');
  lista.retiraRecursivo(20);
  console.log(`retiraRecursivo(20) -> ${lista.toString()}`);
  lista.retiraRecursivo(999);
  console.log(`retiraRecursivo(999) -> ${lista.toString()}`);

  printSection('Comparacao entre listas');
  const listaIgual = buildList([5, 10, 30]);
  const listaDiferente = buildList([5, 10, 99]);

  console.log(`igual(listaIgual): ${lista.igual(listaIgual)}`);
  console.log(`igualRecursivo(listaIgual): ${lista.igualRecursivo(listaIgual)}`);
  console.log(`igualRecursivo(listaDiferente): ${lista.igualRecursivo(listaDiferente)}`);

  printSection('Comprimento recursivo');
  console.log(`comprimento(): ${lista.comprimento()}`);
  console.log(`comprimentoRecursivo(): ${lista.comprimentoRecursivo()}`);

  printSection('Libera');
  lista.libera();
  console.log(`vazia(): ${lista.vazia()}`);
  console.log(`comprimentoRecursivo(): ${lista.comprimentoRecursivo()}`);
  console.log(`toString(): "${lista.toString()}"`);
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return (
    currentEntryFile.endsWith('single-linked-list-recursive-demo.ts') ||
    currentEntryFile.endsWith('single-linked-list-recursive-demo.js')
  );
}

if (isDirectExecution()) {
  runSingleLinkedListRecursiveDemo();
}

// npm run build && node dist/data-structures/single-linked-list-recursive-demo.js
// para executar a demonstracao.
