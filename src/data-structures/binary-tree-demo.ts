import { ArvoreBinaria, NoArvoreBinaria } from './binary-tree';

/**
 * Demonstração de chaveamento eliminatório de jogos da Copa do Mundo FIFA
 * utilizando Árvore Binária para representar a estrutura do torneio.
 */

export class ChaveamentoFIFA {
  private arvore: ArvoreBinaria;

  public constructor() {
    this.arvore = new ArvoreBinaria();
  }

  /**
   * Monta uma árvore binária de chaveamento com um pequeno chaveamento com pelo menos 4 seleções e 3 partidas.
   * Exemplo:
   *          Final
   *         /      \
   *     Semifinal1  Semifinal2
   *      /    \      /    \
   *    J1    J2    J3    J4
   */
  public montarChaveamento(): void {
    // Cria os nós das partidas das semifinais
    const jogo1 = new NoArvoreBinaria('Brasil vs Alemanha');
    const jogo2 = new NoArvoreBinaria('França vs Espanha');
    const jogo3 = new NoArvoreBinaria('Argentina vs Itália');
    const jogo4 = new NoArvoreBinaria('Portugal vs Holanda');

    // Cria os nós das semifinais
    const semifinal1 = new NoArvoreBinaria('Semifinal 1');
    semifinal1.setEsq(jogo1);
    semifinal1.setDir(jogo2);

    const semifinal2 = new NoArvoreBinaria('Semifinal 2');
    semifinal2.setEsq(jogo3);
    semifinal2.setDir(jogo4);

    // Cria a raiz (Final)
    const final = new NoArvoreBinaria('FINAL');
    final.setEsq(semifinal1);
    final.setDir(semifinal2);

    // Define a raiz da árvore
    this.arvore.definerRaiz(final);
  }

  /**
   * Retorna a árvore de chaveamento
   */
  public getArvore(): ArvoreBinaria {
    return this.arvore;
  }

  /**
   * Exibe informações do chaveamento
   */
  public exibirInformacoes(): void {
    console.log('\n=== CHAVEAMENTO COPA DO MUNDO FIFA ===\n');

    console.log(`Árvore existe: ${this.arvore.raiz()}`);
    console.log(`Total de nós (partidas): ${this.arvore.numeros()}`);
    console.log(`Número de folhas (jogos de grupos): ${this.arvore.folhas()}`);
    console.log(`Altura da árvore: ${this.arvore.altura()}`);

    console.log('\n--- Traversais da Árvore ---');
    this.arvore.imprime();

    console.log('\n--- Buscas Específicas ---');
    const buscaBrasil = this.arvore.pertence('Brasil vs Alemanha');
    console.log(`"Brasil vs Alemanha" existe: ${buscaBrasil}`);

    const buscaJapao = this.arvore.pertence('Japão vs Coreia');
    console.log(`"Japão vs Coreia" existe: ${buscaJapao}`);
  }

  /**
   * Cria uma segunda árvore de chaveamento para teste de igualdade
   */
  public criarChaveamentoIdentico(): ArvoreBinaria {
    const arvore2 = new ArvoreBinaria();

    const jogo1 = new NoArvoreBinaria('Brasil vs Alemanha');
    const jogo2 = new NoArvoreBinaria('França vs Espanha');
    const jogo3 = new NoArvoreBinaria('Argentina vs Itália');
    const jogo4 = new NoArvoreBinaria('Portugal vs Holanda');

    const semifinal1 = new NoArvoreBinaria('Semifinal 1');
    semifinal1.setEsq(jogo1);
    semifinal1.setDir(jogo2);

    const semifinal2 = new NoArvoreBinaria('Semifinal 2');
    semifinal2.setEsq(jogo3);
    semifinal2.setDir(jogo4);

    const final = new NoArvoreBinaria('FINAL');
    final.setEsq(semifinal1);
    final.setDir(semifinal2);

    arvore2.definerRaiz(final);
    return arvore2;
  }
}
