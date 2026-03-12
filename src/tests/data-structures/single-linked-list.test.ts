import { afterEach, describe, expect, it, vi } from 'vitest';
import { Lista, NoLista } from '@/data-structures/single-linked-list';

describe('NoLista', () => {
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

describe('Lista - basic operations', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start empty', () => {
    const lista = new Lista();

    expect(lista.vazia()).toBe(true);
    expect(lista.comprimento()).toBe(0);
    expect(lista.busca(5)).toBeNull();
    expect(lista.ultimo()).toBeNull();
    expect(lista.toString()).toBe('');
  });

  it('should insert at the beginning of the list', () => {
    const lista = new Lista();

    lista.insere(10);
    lista.insere(20);
    lista.insere(30);

    expect(lista.toString()).toBe('30 20 10');
    expect(lista.comprimento()).toBe(3);
    expect(lista.vazia()).toBe(false);
  });

  it('should find the first matching node in busca', () => {
    const lista = new Lista();

    lista.insere(1);
    lista.insere(2);
    lista.insere(2);

    const foundNode = lista.busca(2);

    expect(foundNode).not.toBeNull();

    if (foundNode !== null) {
      expect(foundNode.getInfo()).toBe(2);
    }

    expect(lista.busca(999)).toBeNull();
  });

  it('should return the last node with ultimo', () => {
    const lista = new Lista();

    lista.insere(1);
    lista.insere(2);
    lista.insere(3);

    const lastNode = lista.ultimo();

    expect(lastNode).not.toBeNull();

    if (lastNode !== null) {
      expect(lastNode.getInfo()).toBe(1);
    }
  });
});

describe('Lista - mutations and output', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should remove only the first matching value in retira', () => {
    const lista = new Lista();

    lista.insere(1);
    lista.insere(2);
    lista.insere(2);

    lista.retira(2);
    expect(lista.toString()).toBe('2 1');

    lista.retira(2);
    expect(lista.toString()).toBe('1');

    lista.retira(999);
    expect(lista.toString()).toBe('1');
  });

  it('should handle head removal and empty list removal', () => {
    const lista = new Lista();

    lista.retira(10);
    expect(lista.vazia()).toBe(true);

    lista.insere(10);
    lista.insere(20);

    lista.retira(20);
    expect(lista.toString()).toBe('10');
  });

  it('should clear all nodes with libera', () => {
    const lista = new Lista();

    lista.insere(1);
    lista.insere(2);
    lista.insere(3);

    lista.libera();

    expect(lista.vazia()).toBe(true);
    expect(lista.comprimento()).toBe(0);
    expect(lista.busca(1)).toBeNull();
    expect(lista.ultimo()).toBeNull();
    expect(lista.toString()).toBe('');
  });

  it('should print list values in imprime', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const lista = new Lista();

    lista.insere(7);
    lista.insere(8);

    lista.imprime();

    expect(logSpy).toHaveBeenCalledWith('8 7');
  });
});
