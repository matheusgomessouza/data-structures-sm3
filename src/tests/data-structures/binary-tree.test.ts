import { describe, it, expect, beforeEach } from 'vitest';
import { ArvoreBinaria, NoArvoreBinaria } from '@/data-structures/binary-tree';

describe('NoArvoreBinaria', () => {
  let no: NoArvoreBinaria;

  beforeEach(() => {
    no = new NoArvoreBinaria('A');
  });

  it('should create a node with info', () => {
    expect(no.getInfo()).toBe('A');
  });

  it('should have null left and right initially', () => {
    expect(no.getEsq()).toBeNull();
    expect(no.getDir()).toBeNull();
  });

  it('should allow setting and getting left child', () => {
    const noEsq = new NoArvoreBinaria('B');
    no.setEsq(noEsq);
    expect(no.getEsq()).toBe(noEsq);
  });

  it('should allow setting and getting right child', () => {
    const noDir = new NoArvoreBinaria('C');
    no.setDir(noDir);
    expect(no.getDir()).toBe(noDir);
  });

  it('should convert to string correctly', () => {
    expect(no.toString()).toBe('A');
  });

  it('should allow modifying info', () => {
    no.setInfo('Z');
    expect(no.getInfo()).toBe('Z');
  });
});

describe('ArvoreBinaria - root operations', () => {
  it('should create an empty tree', () => {
    const arvore = new ArvoreBinaria();
    expect(arvore.temRaiz()).toBe(false);
  });

  it('should allow setting root', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    arvore.definirRaiz(raiz);
    expect(arvore.temRaiz()).toBe(true);
  });

  it('should return root node via getRaiz', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    arvore.definirRaiz(raiz);
    expect(arvore.getRaiz()).toBe(raiz);
  });

  it('should return null for getRaiz on empty tree', () => {
    const arvore = new ArvoreBinaria();
    expect(arvore.getRaiz()).toBeNull();
  });
});

describe('ArvoreBinaria - pertence', () => {
  it('should find value at root', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    raiz.setEsq(esq);
    raiz.setDir(dir);
    arvore.definirRaiz(raiz);

    expect(arvore.pertence('A')).toBe(true);
  });

  it('should find value in left subtree', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    raiz.setEsq(esq);
    raiz.setDir(dir);
    arvore.definirRaiz(raiz);

    expect(arvore.pertence('B')).toBe(true);
  });

  it('should find value in right subtree', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    raiz.setEsq(esq);
    raiz.setDir(dir);
    arvore.definirRaiz(raiz);

    expect(arvore.pertence('C')).toBe(true);
  });

  it('should return false for non-existing value', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    raiz.setEsq(new NoArvoreBinaria('B'));
    arvore.definirRaiz(raiz);

    expect(arvore.pertence('D')).toBe(false);
  });

  it('should return false for empty tree', () => {
    const arvoreVazia = new ArvoreBinaria();
    expect(arvoreVazia.pertence('A')).toBe(false);
  });
});

describe('ArvoreBinaria - folhas', () => {
  it('should return 0 for empty tree', () => {
    const arvore = new ArvoreBinaria();
    expect(arvore.folhas()).toBe(0);
  });

  it('should return 1 for tree with only root', () => {
    const arvore = new ArvoreBinaria();
    arvore.definirRaiz(new NoArvoreBinaria('A'));
    expect(arvore.folhas()).toBe(1);
  });

  it('should count leaves correctly', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);

    arvore.definirRaiz(raiz);
    expect(arvore.folhas()).toBe(2);
  });
});

describe('ArvoreBinaria - numeros', () => {
  it('should return 0 for empty tree', () => {
    const arvore = new ArvoreBinaria();
    expect(arvore.numeros()).toBe(0);
  });

  it('should return 1 for tree with only root', () => {
    const arvore = new ArvoreBinaria();
    arvore.definirRaiz(new NoArvoreBinaria('A'));
    expect(arvore.numeros()).toBe(1);
  });

  it('should count all nodes correctly', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);

    arvore.definirRaiz(raiz);
    expect(arvore.numeros()).toBe(4);
  });
});

describe('ArvoreBinaria - altura', () => {
  it('should return -1 for empty tree', () => {
    const arvore = new ArvoreBinaria();
    expect(arvore.altura()).toBe(-1);
  });

  it('should return 0 for tree with only root', () => {
    const arvore = new ArvoreBinaria();
    arvore.definirRaiz(new NoArvoreBinaria('A'));
    expect(arvore.altura()).toBe(0);
  });

  it('should calculate height correctly', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);

    arvore.definirRaiz(raiz);
    expect(arvore.altura()).toBe(2);
  });
});

describe('ArvoreBinaria - igual', () => {
  it('should return true for equal empty trees', () => {
    const arvore = new ArvoreBinaria();
    const arvore2 = new ArvoreBinaria();
    expect(arvore.igual(arvore2)).toBe(true);
  });

  it('should return true for identical trees', () => {
    const arvore = new ArvoreBinaria();
    const raiz1 = new NoArvoreBinaria('A');
    const esq1 = new NoArvoreBinaria('B');
    const dir1 = new NoArvoreBinaria('C');
    raiz1.setEsq(esq1);
    raiz1.setDir(dir1);
    arvore.definirRaiz(raiz1);

    const arvore2 = new ArvoreBinaria();
    const raiz2 = new NoArvoreBinaria('A');
    const esq2 = new NoArvoreBinaria('B');
    const dir2 = new NoArvoreBinaria('C');
    raiz2.setEsq(esq2);
    raiz2.setDir(dir2);
    arvore2.definirRaiz(raiz2);

    expect(arvore.igual(arvore2)).toBe(true);
  });

  it('should return false for different trees', () => {
    const arvore = new ArvoreBinaria();
    const raiz1 = new NoArvoreBinaria('A');
    const esq1 = new NoArvoreBinaria('B');
    raiz1.setEsq(esq1);
    arvore.definirRaiz(raiz1);

    const arvore2 = new ArvoreBinaria();
    const raiz2 = new NoArvoreBinaria('A');
    const esq2 = new NoArvoreBinaria('C');
    raiz2.setEsq(esq2);
    arvore2.definirRaiz(raiz2);

    expect(arvore.igual(arvore2)).toBe(false);
  });
});

describe('ArvoreBinaria - traversals', () => {
  it('imprimePre should return correct pre-order', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');
    const esqDir = new NoArvoreBinaria('E');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);
    esq.setDir(esqDir);

    arvore.definirRaiz(raiz);
    expect(arvore.imprimePre()).toBe('A B D E C');
  });

  it('imprimeSim should return correct in-order', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');
    const esqDir = new NoArvoreBinaria('E');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);
    esq.setDir(esqDir);

    arvore.definirRaiz(raiz);
    expect(arvore.imprimeSim()).toBe('D B E A C');
  });

  it('imprimePos should return correct post-order', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    const dir = new NoArvoreBinaria('C');
    const esqEsq = new NoArvoreBinaria('D');
    const esqDir = new NoArvoreBinaria('E');

    raiz.setEsq(esq);
    raiz.setDir(dir);
    esq.setEsq(esqEsq);
    esq.setDir(esqDir);

    arvore.definirRaiz(raiz);
    expect(arvore.imprimePos()).toBe('D E B C A');
  });
});

describe('ArvoreBinaria - toString', () => {
  it('should generate string representation', () => {
    const arvore = new ArvoreBinaria();
    const raiz = new NoArvoreBinaria('A');
    const esq = new NoArvoreBinaria('B');
    raiz.setEsq(esq);
    arvore.definirRaiz(raiz);

    const resultado = arvore.toString();
    expect(resultado).toContain('Árvore Binária');
    expect(resultado).toContain('A B');
  });
});
