import { FilaVetor } from './queue';

function printSection(title: string): void {
  console.log(`\n=== ${title} ===`);
}

function tryEnqueue(fila: FilaVetor, senha: number): void {
  try {
    fila.enqueue(senha);
    console.log(`Chega a senha ${senha} -> fila: ${fila.toString()}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';

    console.error(`Nao foi possivel inserir senha ${senha}: ${message}`);
  }
}

function atenderSenha(fila: FilaVetor): void {
  try {
    const senhaAtendida = fila.dequeue();
    console.log(`Atende uma senha: ${senhaAtendida}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';

    console.error(`Nao foi possivel atender senha: ${message}`);
  }
}

export class FilaMain {
  public static main(): void {
    const capacidadeMaxima = 5;
    const fila = new FilaVetor(capacidadeMaxima);

    printSection('Sistema de atendimento por senhas');
    console.log(`Capacidade maxima da fila: ${capacidadeMaxima}`);

    printSection('Chegada inicial de clientes');
    const senhasIniciais = [101, 102, 103, 104, 105];

    for (const senha of senhasIniciais) {
      tryEnqueue(fila, senha);
    }

    printSection('Tentativa de insercao com capacidade esgotada');
    tryEnqueue(fila, 999);

    printSection('Atendimento e nova chegada');
    atenderSenha(fila);
    tryEnqueue(fila, 106);

    printSection('Fila atual na ordem de atendimento');
    console.log(fila.toString());

    printSection('Reinicio do atendimento');
    fila.reset();
    console.log(`Fila vazia? ${fila.isEmpty()}`);
    console.log(`Representacao textual: "${fila.toString()}"`);
  }
}

export function runQueueDemo(): void {
  FilaMain.main();
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return currentEntryFile.endsWith('queue-demo.ts') || currentEntryFile.endsWith('queue-demo.js');
}

if (isDirectExecution()) {
  FilaMain.main();
}

// npm run build && node dist/data-structures/queue-demo.js
