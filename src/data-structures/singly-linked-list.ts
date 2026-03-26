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

  public libera(): void {
    let currentNode = this.prim;

    while (currentNode !== null) {
      const nextNode = currentNode.getProx();
      currentNode.setProx(null);
      currentNode = nextNode;
    }

    this.prim = null;
  }
}
