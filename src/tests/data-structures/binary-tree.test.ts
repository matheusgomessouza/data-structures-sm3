import { describe, it, expect, beforeEach } from 'vitest';
import { ArvoreBinaria, NoArvoreBinaria } from '../../data-structures/binary-tree';

describe('NoArvoreBinaria', () => {
  let no: NoArvoreBinaria;

  beforeEach(() => {
    no = new NoArvoreBinaria('A');
  });

  it('deve criar um nó com informação', () => {
    expect(no.getInfo()).toBe('A');
  });

  it('deve ter esquerda e direita nulas inicialmente', () => {
    expect(no.getEsq()).toBeNull();
    expect(no.getDir()).toBeNull();
  });

  it('deve permitir setar e obter esquerda', () => {
    const noEsq = new NoArvoreBinaria('B');
    no.setEsq(noEsq);
    expect(no.getEsq()).toBe(noEsq);
  });

  it('deve permitir setar e obter direita', () => {
    const noDir = new NoArvoreBinaria('C');
    no.setDir(noDir);
    expect(no.getDir()).toBe(noDir);
  });

  it('deve converter para string corretamente', () => {
    expect(no.toString()).toBe('A');
  });

  it('deve permitir modificar informação', () => {
    no.setInfo('Z');
    expect(no.getInfo()).toBe('Z');
  });
});

describe('ArvoreBinaria', () => {
  let arvore: ArvoreBinaria;

  beforeEach(() => {
    arvore = new ArvoreBinaria();
  });

  it('deve criar uma árvore vazia', () => {
    expect(arvore.raiz()).toBe(false);
  });

  it('deve permitir definir raiz', () => {
    const raiz = new NoArvoreBinaria('A');
    arvore.definerRaiz(raiz);
    expect(arvore.raiz()).toBe(true);
  });

  describe('pertence', () => {
    beforeEach(() => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      const dir = new NoArvoreBinaria('C');
      raiz.setEsq(esq);
      raiz.setDir(dir);
      arvore.definerRaiz(raiz);
    });

    it('deve encontrar valor na raiz', () => {
      expect(arvore.pertence('A')).toBe(true);
    });

    it('deve encontrar valor na subárvore esquerda', () => {
      expect(arvore.pertence('B')).toBe(true);
    });

    it('deve encontrar valor na subárvore direita', () => {
      expect(arvore.pertence('C')).toBe(true);
    });

    it('deve retornar false para valor não existente', () => {
      expect(arvore.pertence('D')).toBe(false);
    });

    it('deve retornar false para árvore vazia', () => {
      const arvoreVazia = new ArvoreBinaria();
      expect(arvoreVazia.pertence('A')).toBe(false);
    });
  });

  describe('folhas', () => {
    it('deve retornar 0 para árvore vazia', () => {
      expect(arvore.folhas()).toBe(0);
    });

    it('deve retornar 1 para árvore com apenas raiz', () => {
      arvore.definerRaiz(new NoArvoreBinaria('A'));
      expect(arvore.folhas()).toBe(1);
    });

    it('deve contar folhas corretamente', () => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      const dir = new NoArvoreBinaria('C');
      const esqEsq = new NoArvoreBinaria('D');

      raiz.setEsq(esq);
      raiz.setDir(dir);
      esq.setEsq(esqEsq);

      arvore.definerRaiz(raiz);
      expect(arvore.folhas()).toBe(2);
    });
  });

  describe('numeros', () => {
    it('deve retornar 0 para árvore vazia', () => {
      expect(arvore.numeros()).toBe(0);
    });

    it('deve retornar 1 para árvore com apenas raiz', () => {
      arvore.definerRaiz(new NoArvoreBinaria('A'));
      expect(arvore.numeros()).toBe(1);
    });

    it('deve contar todos os nós corretamente', () => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      const dir = new NoArvoreBinaria('C');
      const esqEsq = new NoArvoreBinaria('D');

      raiz.setEsq(esq);
      raiz.setDir(dir);
      esq.setEsq(esqEsq);

      arvore.definerRaiz(raiz);
      expect(arvore.numeros()).toBe(4);
    });
  });

  describe('altura', () => {
    it('deve retornar -1 para árvore vazia', () => {
      expect(arvore.altura()).toBe(-1);
    });

    it('deve retornar 0 para árvore com apenas raiz', () => {
      arvore.definerRaiz(new NoArvoreBinaria('A'));
      expect(arvore.altura()).toBe(0);
    });

    it('deve calcular altura corretamente', () => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      const dir = new NoArvoreBinaria('C');
      const esqEsq = new NoArvoreBinaria('D');

      raiz.setEsq(esq);
      raiz.setDir(dir);
      esq.setEsq(esqEsq);

      arvore.definerRaiz(raiz);
      expect(arvore.altura()).toBe(2);
    });
  });

  describe('igual', () => {
    it('deve retornar true para árvores vazias iguais', () => {
      const arvore2 = new ArvoreBinaria();
      expect(arvore.igual(arvore2)).toBe(true);
    });

    it('deve retornar true para árvores idênticas', () => {
      const raiz1 = new NoArvoreBinaria('A');
      const esq1 = new NoArvoreBinaria('B');
      const dir1 = new NoArvoreBinaria('C');
      raiz1.setEsq(esq1);
      raiz1.setDir(dir1);
      arvore.definerRaiz(raiz1);

      const arvore2 = new ArvoreBinaria();
      const raiz2 = new NoArvoreBinaria('A');
      const esq2 = new NoArvoreBinaria('B');
      const dir2 = new NoArvoreBinaria('C');
      raiz2.setEsq(esq2);
      raiz2.setDir(dir2);
      arvore2.definerRaiz(raiz2);

      expect(arvore.igual(arvore2)).toBe(true);
    });

    it('deve retornar false para árvores diferentes', () => {
      const raiz1 = new NoArvoreBinaria('A');
      const esq1 = new NoArvoreBinaria('B');
      raiz1.setEsq(esq1);
      arvore.definerRaiz(raiz1);

      const arvore2 = new ArvoreBinaria();
      const raiz2 = new NoArvoreBinaria('A');
      const esq2 = new NoArvoreBinaria('C');
      raiz2.setEsq(esq2);
      arvore2.definerRaiz(raiz2);

      expect(arvore.igual(arvore2)).toBe(false);
    });
  });

  describe('Traversais', () => {
    beforeEach(() => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      const dir = new NoArvoreBinaria('C');
      const esqEsq = new NoArvoreBinaria('D');
      const esqDir = new NoArvoreBinaria('E');

      raiz.setEsq(esq);
      raiz.setDir(dir);
      esq.setEsq(esqEsq);
      esq.setDir(esqDir);

      arvore.definerRaiz(raiz);
    });

    it('imprimePre deve retornar pré-ordem correta', () => {
      expect(arvore.imprimePre()).toBe('A B D E C');
    });

    it('imprimeSim deve retornar in-ordem correta', () => {
      expect(arvore.imprimeSim()).toBe('D B E A C');
    });

    it('imprimePos deve retornar pós-ordem correta', () => {
      expect(arvore.imprimePos()).toBe('D E B C A');
    });
  });

  describe('toString', () => {
    it('deve gerar representação em string', () => {
      const raiz = new NoArvoreBinaria('A');
      const esq = new NoArvoreBinaria('B');
      raiz.setEsq(esq);
      arvore.definerRaiz(raiz);

      const resultado = arvore.toString();
      expect(resultado).toContain('Árvore Binária');
      expect(resultado).toContain('A B');
    });
  });
});
