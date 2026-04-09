import { runPilhaMain } from './stacks';

function printSection(title: string): void {
  console.log(`\n=== ${title} ===`);
}

export function runStacksDemo(): void {
  printSection('Calculadora pos-fixada - exemplo do enunciado');
  console.log('Entrada: 3 5 8 * + 7 / q');

  runPilhaMain(['3', '5', '8', '*', '+', '7', '/', 'q'], '%.2f\n');
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return currentEntryFile.endsWith('stacks-demo.ts') || currentEntryFile.endsWith('stacks-demo.js');
}

if (isDirectExecution()) {
  const tokens = process.argv.slice(2);

  if (tokens.length === 0) {
    runStacksDemo();
  } else {
    printSection('Calculadora pos-fixada - entrada via CLI');
    console.log(`Entrada: ${tokens.join(' ')}`);
    runPilhaMain(tokens, '%.2f\n');
  }
}

// npm run build && node dist/data-structures/stacks-demo.js
// npm run build && node dist/data-structures/stacks-demo.js 3 5 8 * + 7 / q
