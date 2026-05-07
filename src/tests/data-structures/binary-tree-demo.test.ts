import { describe, it, expect, beforeEach } from 'vitest';
import { ChaveamentoFIFA } from '@/data-structures/binary-tree-demo';

describe('ChaveamentoFIFA - montarChaveamento', () => {
  let chaveamento: ChaveamentoFIFA;

  beforeEach(() => {
    chaveamento = new ChaveamentoFIFA();
  });

  it('should build a valid bracket tree', () => {
    chaveamento.montarChaveamento();
    const arvore = chaveamento.getArvore();

    expect(arvore.temRaiz()).toBe(true);
  });

  it('should have correct number of nodes', () => {
    chaveamento.montarChaveamento();
    const arvore = chaveamento.getArvore();

    // 1 final + 2 semifinals + 4 matches = 7 nodes
    expect(arvore.numeros()).toBe(7);
  });

  it('should have 4 leaf nodes (quarterfinal matches)', () => {
    chaveamento.montarChaveamento();
    const arvore = chaveamento.getArvore();

    expect(arvore.folhas()).toBe(4);
  });

  it('should have correct height (3 levels)', () => {
    chaveamento.montarChaveamento();
    const arvore = chaveamento.getArvore();

    expect(arvore.altura()).toBe(2);
  });
});

describe('ChaveamentoFIFA - searches', () => {
  let chaveamento: ChaveamentoFIFA;

  beforeEach(() => {
    chaveamento = new ChaveamentoFIFA();
    chaveamento.montarChaveamento();
  });

  it('should find FINAL', () => {
    expect(chaveamento.getArvore().pertence('FINAL')).toBe(true);
  });

  it('should find Semifinal 1', () => {
    expect(chaveamento.getArvore().pertence('Semifinal 1')).toBe(true);
  });

  it('should find Semifinal 2', () => {
    expect(chaveamento.getArvore().pertence('Semifinal 2')).toBe(true);
  });

  it('should find Brasil vs Alemanha match', () => {
    expect(chaveamento.getArvore().pertence('Brasil vs Alemanha')).toBe(true);
  });

  it('should find França vs Espanha match', () => {
    expect(chaveamento.getArvore().pertence('França vs Espanha')).toBe(true);
  });

  it('should find Argentina vs Itália match', () => {
    expect(chaveamento.getArvore().pertence('Argentina vs Itália')).toBe(true);
  });

  it('should find Portugal vs Holanda match', () => {
    expect(chaveamento.getArvore().pertence('Portugal vs Holanda')).toBe(true);
  });

  it('should return false for non-existing match', () => {
    expect(chaveamento.getArvore().pertence('Japão vs Coreia')).toBe(false);
  });
});

describe('ChaveamentoFIFA - traversals', () => {
  let chaveamento: ChaveamentoFIFA;

  beforeEach(() => {
    chaveamento = new ChaveamentoFIFA();
    chaveamento.montarChaveamento();
  });

  it('should return correct pre-order', () => {
    const resultado = chaveamento.getArvore().imprimePre();

    expect(resultado).toContain('FINAL');
    expect(resultado).toContain('Semifinal 1');
    expect(resultado).toContain('Semifinal 2');
    expect(resultado).toContain('Brasil vs Alemanha');
  });

  it('should return correct in-order', () => {
    const resultado = chaveamento.getArvore().imprimeSim();

    expect(resultado).toContain('Brasil vs Alemanha');
    expect(resultado).toContain('Semifinal 1');
  });

  it('should return correct post-order', () => {
    const resultado = chaveamento.getArvore().imprimePos();

    expect(resultado).toContain('Brasil vs Alemanha');
    expect(resultado).toContain('FINAL');
  });
});

describe('ChaveamentoFIFA - equality', () => {
  let chaveamento: ChaveamentoFIFA;

  beforeEach(() => {
    chaveamento = new ChaveamentoFIFA();
  });

  it('should return true for identical brackets', () => {
    chaveamento.montarChaveamento();
    const arvore1 = chaveamento.getArvore();
    const arvore2 = chaveamento.criarChaveamentoIdentico();

    expect(arvore1.igual(arvore2)).toBe(true);
  });

  it('should create identical bracket with correct structure', () => {
    chaveamento.montarChaveamento();
    const arvore2 = chaveamento.criarChaveamentoIdentico();

    expect(arvore2.temRaiz()).toBe(true);
    expect(arvore2.numeros()).toBe(7);
    expect(arvore2.folhas()).toBe(4);
  });
});
