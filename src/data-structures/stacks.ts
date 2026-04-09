type Operador = '+' | '-' | '*' | '/';

export class NoLista {
  private info: number;
  private prox: NoLista | null;

  public constructor(info: number, prox: NoLista | null = null) {
    this.info = info;
    this.prox = prox;
  }

  public setInfo(info: number): void {
    this.info = info;
  }

  public getInfo(): number {
    return this.info;
  }

  public setProx(prox: NoLista | null): void {
    this.prox = prox;
  }

  public getProx(): NoLista | null {
    return this.prox;
  }

  public toString(): string {
    return `${this.info}`;
  }
}

export class Pilha {
  private topoNo: NoLista | null;

  public constructor() {
    this.topoNo = null;
  }

  public push(v: number): void {
    this.topoNo = new NoLista(v, this.topoNo);
  }

  public pop(): number {
    if (this.topoNo === null) {
      throw new Error('Pilha vazia.');
    }

    const removido = this.topoNo;
    this.topoNo = removido.getProx();
    removido.setProx(null);

    return removido.getInfo();
  }

  public vazia(): boolean {
    return this.topoNo === null;
  }

  public top(): number {
    if (this.topoNo === null) {
      throw new Error('Pilha vazia.');
    }

    return this.topoNo.getInfo();
  }

  public libera(): void {
    let atual = this.topoNo;

    while (atual !== null) {
      const proximo = atual.getProx();
      atual.setProx(null);
      atual = proximo;
    }

    this.topoNo = null;
  }
}

export class Calc {
  private formato: string;
  private p: Pilha;

  public constructor(formato = '%.2f\n') {
    this.formato = formato;
    this.p = new Pilha();
  }

  public operando(v: number): void {
    this.p.push(v);
    this.imprimeTopo();
  }

  public operador(op: Operador): void {
    const b = this.retiraOuZero();
    const a = this.retiraOuZero();

    if (op === '/' && b === 0) {
      console.error('Divisao por zero.');
      this.p.push(a);
      this.p.push(b);

      return;
    }

    const resultado = this.calcula(a, b, op);
    this.p.push(resultado);
    this.imprimeTopo();
  }

  public top(): number {
    return this.p.top();
  }

  public vazia(): boolean {
    return this.p.vazia();
  }

  public libera(): void {
    this.p.libera();
  }

  private retiraOuZero(): number {
    try {
      return this.p.pop();
    } catch {
      return 0;
    }
  }

  private calcula(a: number, b: number, op: Operador): number {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return 0;
    }
  }

  private imprimeTopo(): void {
    console.log(this.formataNumero(this.p.top()));
  }

  private formataNumero(valor: number): string {
    const precisao = this.extraiPrecisao();

    if (precisao !== null) {
      return valor.toFixed(precisao);
    }

    return `${valor}`;
  }

  private extraiPrecisao(): number | null {
    const correspondencia = this.formato.match(/%\.(\d+)f/);

    if (correspondencia === null) {
      return null;
    }

    return Number(correspondencia[1]);
  }
}

function isOperador(token: string): token is Operador {
  return token === '+' || token === '-' || token === '*' || token === '/';
}

export function runPilhaMain(tokens: string[], formato = '%.2f\n'): void {
  const calc = new Calc(formato);

  for (const token of tokens) {
    if (token.toLowerCase() === 'q') {
      break;
    }

    const valor = Number(token);

    if (!Number.isNaN(valor)) {
      calc.operando(valor);

      continue;
    }

    if (isOperador(token)) {
      calc.operador(token);

      continue;
    }

    console.error(`Entrada invalida: ${token}`);
  }

  calc.libera();
}
