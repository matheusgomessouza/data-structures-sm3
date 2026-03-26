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

export class Lista {
  private prim: NoLista | null;

  public constructor() {
    this.prim = null;
  }

  public insere(v: number): void {
    this.prim = new NoLista(v, this.prim);
  }

  public imprime(): void {
    console.log(this.toString());
  }

  public toString(): string {
    const values: number[] = [];
    let currentNode = this.prim;

    while (currentNode !== null) {
      values.push(currentNode.getInfo());
      currentNode = currentNode.getProx();
    }

    return values.join(' ');
  }

  public vazia(): boolean {
    return this.prim === null;
  }

  public busca(v: number): NoLista | null {
    let currentNode = this.prim;

    while (currentNode !== null) {
      if (currentNode.getInfo() === v) {
        return currentNode;
      }

      currentNode = currentNode.getProx();
    }

    return null;
  }

  public comprimento(): number {
    let length = 0;
    let currentNode = this.prim;

    while (currentNode !== null) {
      length++;
      currentNode = currentNode.getProx();
    }

    return length;
  }

  public comprimentoRecursivo(): number {
    return this.comprimentoRecursivoAux(this.prim);
  }

  private comprimentoRecursivoAux(no: NoLista | null): number {
    if (no === null) {
      return 0;
    }

    return 1 + this.comprimentoRecursivoAux(no.getProx());
  }

  public ultimo(): NoLista | null {
    let currentNode = this.prim;

    if (currentNode === null) {
      return null;
    }

    while (currentNode.getProx() !== null) {
      currentNode = currentNode.getProx()!;
    }

    return currentNode;
  }

  public retira(v: number): void {
    if (this.prim === null) {
      return;
    }

    if (this.prim.getInfo() === v) {
      const removedNode = this.prim;
      this.prim = this.prim.getProx();
      removedNode.setProx(null);

      return;
    }

    let previousNode = this.prim;
    let currentNode = this.prim.getProx();

    while (currentNode !== null) {
      if (currentNode.getInfo() === v) {
        previousNode.setProx(currentNode.getProx());
        currentNode.setProx(null);

        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.getProx();
    }
  }

  public retiraRecursivo(v: number): void {
    this.prim = this.retiraRecursivoAux(this.prim, v);
  }

  private retiraRecursivoAux(no: NoLista | null, v: number): NoLista | null {
    if (no === null) {
      return null;
    }

    if (no.getInfo() === v) {
      const nextNode = no.getProx();
      no.setProx(null);

      return nextNode;
    }

    no.setProx(this.retiraRecursivoAux(no.getProx(), v));

    return no;
  }

  public libera(): void {
    let currentNode = this.prim;

    while (currentNode !== null) {
      const nextNode = currentNode.getProx();
      currentNode.setProx(null);
      currentNode = nextNode;
    }

    this.prim = null;
  }

  public insereFim(v: number): void {
    const newNode = new NoLista(v);

    if (this.prim === null) {
      this.prim = newNode;

      return;
    }

    const lastNode = this.ultimo();

    if (lastNode !== null) {
      lastNode.setProx(newNode);
    }
  }

  public igual(l1: Lista): boolean {
    let currentNode = this.prim;
    let compareNode = l1.prim;

    while (currentNode !== null && compareNode !== null) {
      if (currentNode.getInfo() !== compareNode.getInfo()) {
        return false;
      }

      currentNode = currentNode.getProx();
      compareNode = compareNode.getProx();
    }

    return currentNode === null && compareNode === null;
  }

  public igualRecursivo(l1: Lista): boolean {
    return this.igualRecursivoAux(this.prim, l1.prim);
  }

  private igualRecursivoAux(l1: NoLista | null, l2: NoLista | null): boolean {
    if (l1 === null || l2 === null) {
      return l1 === null && l2 === null;
    }

    if (l1.getInfo() !== l2.getInfo()) {
      return false;
    }

    return this.igualRecursivoAux(l1.getProx(), l2.getProx());
  }

  public imprimeRecursivo(): void {
    const values = this.imprimeRecursivoAux(this.prim);

    console.log(values.join(' '));
  }

  private imprimeRecursivoAux(no: NoLista | null): number[] {
    if (no === null) {
      return [];
    }

    return [no.getInfo(), ...this.imprimeRecursivoAux(no.getProx())];
  }
}
