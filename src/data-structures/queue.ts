export interface Fila {
  enqueue(v: number): void;
  dequeue(): number;
  isEmpty(): boolean;
  reset(): void;
}

export class FilaVetor implements Fila {
  private tam: number;
  private n: number;
  private ini: number;
  private vet: Array<number | undefined>;

  public constructor(tam: number) {
    if (!Number.isInteger(tam) || tam <= 0) {
      throw new RangeError('Capacidade da fila deve ser um inteiro positivo.');
    }

    this.tam = tam;
    this.n = 0;
    this.ini = 0;
    this.vet = new Array<number | undefined>(tam);
  }

  public enqueue(v: number): void {
    if (this.n === this.tam) {
      throw new Error('Fila cheia.');
    }

    const fim = this.getEndIndex();
    this.vet[fim] = v;
    this.n++;
  }

  public dequeue(): number {
    if (this.isEmpty()) {
      throw new Error('Fila vazia.');
    }

    const removido = this.vet[this.ini]!;
    this.ini = (this.ini + 1) % this.tam;
    this.n--;

    return removido;
  }

  public isEmpty(): boolean {
    return this.n === 0;
  }

  public reset(): void {
    this.n = 0;
    this.ini = 0;
    this.vet = new Array<number | undefined>(this.tam);
  }

  public toString(): string {
    const values: number[] = [];

    for (let offset = 0; offset < this.n; offset++) {
      values.push(this.getValueAt(offset));
    }

    return values.join(' ');
  }

  public concatena(f2: FilaVetor): FilaVetor {
    const total = this.n + f2.n;
    const resultado = new FilaVetor(Math.max(total, 1));

    this.copyValuesTo(resultado);
    f2.copyValuesTo(resultado);

    return resultado;
  }

  public merge(f2: FilaVetor): FilaVetor {
    const total = this.n + f2.n;
    const resultado = new FilaVetor(Math.max(total, 1));
    const maxIntercalacao = Math.max(this.n, f2.n);

    for (let index = 0; index < maxIntercalacao; index++) {
      if (index < this.n) {
        resultado.enqueue(this.getValueAt(index));
      }

      if (index < f2.n) {
        resultado.enqueue(f2.getValueAt(index));
      }
    }

    return resultado;
  }

  private getValueAt(offset: number): number {
    const index = (this.ini + offset) % this.tam;

    return this.vet[index]!;
  }

  private getEndIndex(): number {
    return (this.ini + this.n) % this.tam;
  }

  private copyValuesTo(destino: FilaVetor): void {
    for (let offset = 0; offset < this.n; offset++) {
      destino.enqueue(this.getValueAt(offset));
    }
  }
}
