export class NoListaDupla {
  private info: string;
  private ant: NoListaDupla | null;
  private prox: NoListaDupla | null;

  public constructor(info: string) {
    this.info = info;
    this.ant = null;
    this.prox = null;
  }

  public setInfo(info: string): void {
    this.info = info;
  }

  public getInfo(): string {
    return this.info;
  }

  public setAnt(ant: NoListaDupla | null): void {
    this.ant = ant;
  }

  public getAnt(): NoListaDupla | null {
    return this.ant;
  }

  public setProx(prox: NoListaDupla | null): void {
    this.prox = prox;
  }

  public getProx(): NoListaDupla | null {
    return this.prox;
  }

  public toString(): string {
    return this.info;
  }
}

export class ListaDupla {
  private head: NoListaDupla | null;
  private tail: NoListaDupla | null;
  private size: number;

  public constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public insere(v: string): void {
    const newNode = new NoListaDupla(v);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;

      return;
    }

    newNode.setProx(this.head);
    this.head.setAnt(newNode);
    this.head = newNode;
    this.size++;
  }

  public insereFim(v: string): void {
    const newNode = new NoListaDupla(v);

    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;

      return;
    }

    newNode.setAnt(this.tail);
    this.tail.setProx(newNode);
    this.tail = newNode;
    this.size++;
  }

  public inserePosicao(v: string, posicao: number): void {
    if (posicao < 1 || posicao > this.size + 1) {
      return;
    }

    if (posicao === 1) {
      this.insere(v);

      return;
    }

    if (posicao === this.size + 1) {
      this.insereFim(v);

      return;
    }

    const currentNode = this.getNodeAtPosition(posicao);

    if (currentNode === null) {
      return;
    }

    const previousNode = currentNode.getAnt();
    const newNode = new NoListaDupla(v);

    newNode.setAnt(previousNode);
    newNode.setProx(currentNode);
    currentNode.setAnt(newNode);

    if (previousNode !== null) {
      previousNode.setProx(newNode);
    }

    this.size++;
  }

  public imprime(): void {
    console.log(this.toString());
  }

  public imprimeNumerada(): void {
    console.log(this.toNumberedString());
  }

  public toString(): string {
    const values: string[] = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      values.push(currentNode.getInfo());
      currentNode = currentNode.getProx();
    }

    return values.join(' | ');
  }

  public toNumberedString(): string {
    const values: string[] = [];
    let currentNode = this.head;
    let position = 1;

    while (currentNode !== null) {
      values.push(`${position}. ${currentNode.getInfo()}`);
      currentNode = currentNode.getProx();
      position++;
    }

    return values.join('\n');
  }

  public vazia(): boolean {
    return this.head === null;
  }

  public busca(v: string): NoListaDupla | null {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.getInfo() === v) {
        return currentNode;
      }

      currentNode = currentNode.getProx();
    }

    return null;
  }

  public comprimento(): number {
    return this.size;
  }

  public ultimo(): NoListaDupla | null {
    return this.tail;
  }

  public retira(v: string): void {
    const nodeToRemove = this.busca(v);

    if (nodeToRemove === null) {
      return;
    }

    this.detachNode(nodeToRemove);
  }

  public retiraPosicao(posicao: number): void {
    const nodeToRemove = this.getNodeAtPosition(posicao);

    if (nodeToRemove === null) {
      return;
    }

    this.detachNode(nodeToRemove);
  }

  public move(origemPosicao: number, novaPosicao: number): void {
    if (origemPosicao === novaPosicao) {
      return;
    }

    const oldSize = this.size;

    if (origemPosicao < 1 || origemPosicao > oldSize || novaPosicao < 1 || novaPosicao > oldSize) {
      return;
    }

    const nodeToMove = this.getNodeAtPosition(origemPosicao);

    if (nodeToMove === null) {
      return;
    }

    const song = nodeToMove.getInfo();

    this.detachNode(nodeToMove);
    this.inserePosicao(song, novaPosicao);
  }

  public libera(): void {
    let currentNode = this.head;

    while (currentNode !== null) {
      const nextNode = currentNode.getProx();
      currentNode.setAnt(null);
      currentNode.setProx(null);
      currentNode = nextNode;
    }

    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  private getNodeAtPosition(posicao: number): NoListaDupla | null {
    if (posicao < 1 || posicao > this.size) {
      return null;
    }

    if (posicao <= Math.ceil(this.size / 2)) {
      return this.walkForward(posicao);
    }

    return this.walkBackward(posicao);
  }

  private walkForward(posicao: number): NoListaDupla | null {
    let currentNode = this.head;

    for (let currentPosition = 1; currentPosition < posicao; currentPosition++) {
      currentNode = currentNode?.getProx() ?? null;
    }

    return currentNode;
  }

  private walkBackward(posicao: number): NoListaDupla | null {
    let currentNode = this.tail;

    for (let currentPosition = this.size; currentPosition > posicao; currentPosition--) {
      currentNode = currentNode?.getAnt() ?? null;
    }

    return currentNode;
  }

  private detachNode(node: NoListaDupla): void {
    const previousNode = node.getAnt();
    const nextNode = node.getProx();

    if (previousNode !== null) {
      previousNode.setProx(nextNode);
    } else {
      this.head = nextNode;
    }

    if (nextNode !== null) {
      nextNode.setAnt(previousNode);
    } else {
      this.tail = previousNode;
    }

    node.setAnt(null);
    node.setProx(null);
    this.size--;
  }
}
