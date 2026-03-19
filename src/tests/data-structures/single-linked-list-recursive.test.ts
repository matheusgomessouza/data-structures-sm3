import { afterEach, describe, expect, it, vi } from 'vitest';
import { Lista, NoLista } from '@/data-structures/single-linked-list-recursive';

function buildList(values: number[]): Lista {
  const lista = new Lista();

  for (const value of values) {
    lista.insereFim(value);
  }

  return lista;
}

describe('NoLista - recursive version', () => {
  it('should initialize info/prox and expose accessors', () => {
    const nextNode = new NoLista(20);
    const node = new NoLista(10, nextNode);

    expect(node.getInfo()).toBe(10);
    expect(node.getProx()).toBe(nextNode);

    node.setInfo(15);
    node.setProx(null);

    expect(node.getInfo()).toBe(15);
    expect(node.getProx()).toBeNull();
    expect(node.toString()).toBe('15');
  });
});

describe('Lista - recursive implementation basics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start empty and report consistent lengths', () => {
    const lista = new Lista();

    expect(lista.vazia()).toBe(true);
    expect(lista.comprimento()).toBe(0);
    expect(lista.comprimentoRecursivo()).toBe(0);
    expect(lista.busca(99)).toBeNull();
    expect(lista.ultimo()).toBeNull();
    expect(lista.toString()).toBe('');
  });

  it('should insert at head with insere and tail with insereFim', () => {
    const lista = new Lista();

    lista.insere(20);
    lista.insere(10);
    lista.insereFim(30);

    expect(lista.toString()).toBe('10 20 30');
    expect(lista.ultimo()?.getInfo()).toBe(30);
    expect(lista.comprimento()).toBe(3);
    expect(lista.comprimentoRecursivo()).toBe(3);
  });

  it('should compare lists with igual considering order and size', () => {
    const listaA = buildList([1, 2, 3]);
    const listaB = buildList([1, 2, 3]);
    const listaDifferentOrder = buildList([1, 3, 2]);
    const listaDifferentSize = buildList([1, 2]);

    expect(listaA.igual(listaB)).toBe(true);
    expect(listaA.igual(listaDifferentOrder)).toBe(false);
    expect(listaA.igual(listaDifferentSize)).toBe(false);
  });
});

describe('Lista - recursive methods from lab requirements', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should print list values with imprimeRecursivo', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const lista = buildList([4, 5, 6]);

    lista.imprimeRecursivo();

    expect(logSpy).toHaveBeenCalledWith('4 5 6');
  });

  it('should remove only first matching node with retiraRecursivo', () => {
    const lista = buildList([1, 2, 2, 3]);

    lista.retiraRecursivo(2);
    expect(lista.toString()).toBe('1 2 3');

    lista.retiraRecursivo(2);
    expect(lista.toString()).toBe('1 3');
  });

  it('should handle head and absent values in retiraRecursivo', () => {
    const lista = buildList([7, 8, 9]);

    lista.retiraRecursivo(7);
    expect(lista.toString()).toBe('8 9');

    lista.retiraRecursivo(999);
    expect(lista.toString()).toBe('8 9');
  });

  it('should compare lists recursively with igualRecursivo', () => {
    const listaA = buildList([10, 20, 30]);
    const listaB = buildList([10, 20, 30]);
    const listaC = buildList([10, 30, 20]);

    expect(listaA.igualRecursivo(listaB)).toBe(true);
    expect(listaA.igualRecursivo(listaC)).toBe(false);
  });

  it('should keep comprimentoRecursivo equivalent to comprimento', () => {
    const lista = buildList([1, 2, 3, 4]);

    expect(lista.comprimentoRecursivo()).toBe(lista.comprimento());

    lista.retiraRecursivo(2);
    expect(lista.comprimentoRecursivo()).toBe(lista.comprimento());

    lista.libera();
    expect(lista.comprimentoRecursivo()).toBe(0);
    expect(lista.comprimento()).toBe(0);
  });
});
