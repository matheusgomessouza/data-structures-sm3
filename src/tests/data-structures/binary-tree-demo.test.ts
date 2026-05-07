import { describe, it, expect, beforeEach } from 'vitest';
import { ChaveamentoFIFA } from '../../data-structures/binary-tree-demo';

describe('ChaveamentoFIFA', () => {
  let chaveamento: ChaveamentoFIFA;

  beforeEach(() => {
    chaveamento = new ChaveamentoFIFA();
  });

  describe('montarChaveamento', () => {
    it('deve montar um chaveamento com árvore válida', () => {
      chaveamento.montarChaveamento();
      const arvore = chaveamento.getArvore();

      expect(arvore.raiz()).toBe(true);
    });

    it('deve ter estrutura com número correto de nós', () => {
      chaveamento.montarChaveamento();
      const arvore = chaveamento.getArvore();

      // 1 final + 2 semifinais + 4 jogos = 7 nós
      expect(arvore.numeros()).toBe(7);
    });

    it('deve ter 4 folhas (jogos de grupos)', () => {
      chaveamento.montarChaveamento();
      const arvore = chaveamento.getArvore();

      expect(arvore.folhas()).toBe(4);
    });

    it('deve ter altura correta (3 níveis)', () => {
      chaveamento.montarChaveamento();
      const arvore = chaveamento.getArvore();

      expect(arvore.altura()).toBe(2);
    });
  });

  describe('Buscas no chaveamento', () => {
    beforeEach(() => {
      chaveamento.montarChaveamento();
    });

    it('deve encontrar FINAL', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('FINAL')).toBe(true);
    });

    it('deve encontrar Semifinal 1', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Semifinal 1')).toBe(true);
    });

    it('deve encontrar Semifinal 2', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Semifinal 2')).toBe(true);
    });

    it('deve encontrar jogo Brasil vs Alemanha', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Brasil vs Alemanha')).toBe(true);
    });

    it('deve encontrar jogo França vs Espanha', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('França vs Espanha')).toBe(true);
    });

    it('deve encontrar jogo Argentina vs Itália', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Argentina vs Itália')).toBe(true);
    });

    it('deve encontrar jogo Portugal vs Holanda', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Portugal vs Holanda')).toBe(true);
    });

    it('deve retornar false para jogo inexistente', () => {
      const arvore = chaveamento.getArvore();
      expect(arvore.pertence('Japão vs Coreia')).toBe(false);
    });
  });

  describe('Traversais do chaveamento', () => {
    beforeEach(() => {
      chaveamento.montarChaveamento();
    });

    it('deve retornar pré-ordem correta', () => {
      const arvore = chaveamento.getArvore();
      const resultado = arvore.imprimePre();

      expect(resultado).toContain('FINAL');
      expect(resultado).toContain('Semifinal 1');
      expect(resultado).toContain('Semifinal 2');
      expect(resultado).toContain('Brasil vs Alemanha');
    });

    it('deve retornar in-ordem correta', () => {
      const arvore = chaveamento.getArvore();
      const resultado = arvore.imprimeSim();

      expect(resultado).toContain('Brasil vs Alemanha');
      expect(resultado).toContain('Semifinal 1');
    });

    it('deve retornar pós-ordem correta', () => {
      const arvore = chaveamento.getArvore();
      const resultado = arvore.imprimePos();

      expect(resultado).toContain('Brasil vs Alemanha');
      expect(resultado).toContain('FINAL');
    });
  });

  describe('Igualdade de chaveamentos', () => {
    it('deve retornar true para chaveamentos idênticos', () => {
      chaveamento.montarChaveamento();
      const arvore1 = chaveamento.getArvore();
      const arvore2 = chaveamento.criarChaveamentoIdentico();

      expect(arvore1.igual(arvore2)).toBe(true);
    });

    it('deve criar chaveamento idêntico com estrutura correta', () => {
      chaveamento.montarChaveamento();
      const arvore2 = chaveamento.criarChaveamentoIdentico();

      expect(arvore2.raiz()).toBe(true);
      expect(arvore2.numeros()).toBe(7);
      expect(arvore2.folhas()).toBe(4);
    });
  });
});
