export class NoArvoreBinaria {
  private info: string;
  private esq: NoArvoreBinaria | null;
  private dir: NoArvoreBinaria | null;

  public constructor(
    info: string,
    esq: NoArvoreBinaria | null = null,
    dir: NoArvoreBinaria | null = null,
  ) {
    this.info = info;
    this.esq = esq;
    this.dir = dir;
  }

  public setInfo(info: string): void {
    this.info = info;
  }

  public getInfo(): string {
    return this.info;
  }

  public setEsq(esq: NoArvoreBinaria | null): void {
    this.esq = esq;
  }

  public getEsq(): NoArvoreBinaria | null {
    return this.esq;
  }

  public setDir(dir: NoArvoreBinaria | null): void {
    this.dir = dir;
  }

  public getDir(): NoArvoreBinaria | null {
    return this.dir;
  }

  public toString(): string {
    return `${this.info}`;
  }
}

export class ArvoreBinaria {
  private raizNo: NoArvoreBinaria | null;

  public constructor() {
    this.raizNo = null;
  }

  public definirRaiz(r: NoArvoreBinaria): void {
    this.raizNo = r;
  }

  public temRaiz(): boolean {
    return this.raizNo !== null;
  }

  public getRaiz(): NoArvoreBinaria | null {
    return this.raizNo;
  }

  public pertence(v: string): boolean {
    return this.pertenceRecursivo(this.raizNo, v);
  }

  private pertenceRecursivo(no: NoArvoreBinaria | null, v: string): boolean {
    if (no === null) {
      return false;
    }

    if (no.getInfo() === v) {
      return true;
    }

    return this.pertenceRecursivo(no.getEsq(), v) || this.pertenceRecursivo(no.getDir(), v);
  }

  public folhas(): number {
    return this.folhasRecursivo(this.raizNo);
  }

  private folhasRecursivo(no: NoArvoreBinaria | null): number {
    if (no === null) {
      return 0;
    }

    if (no.getEsq() === null && no.getDir() === null) {
      return 1;
    }

    return this.folhasRecursivo(no.getEsq()) + this.folhasRecursivo(no.getDir());
  }

  public numeros(): number {
    return this.numerosRecursivo(this.raizNo);
  }

  private numerosRecursivo(no: NoArvoreBinaria | null): number {
    if (no === null) {
      return 0;
    }

    return 1 + this.numerosRecursivo(no.getEsq()) + this.numerosRecursivo(no.getDir());
  }

  public altura(): number {
    return this.alturaRecursivo(this.raizNo);
  }

  private alturaRecursivo(no: NoArvoreBinaria | null): number {
    if (no === null) {
      return -1;
    }

    return 1 + Math.max(this.alturaRecursivo(no.getEsq()), this.alturaRecursivo(no.getDir()));
  }

  public igual(a: ArvoreBinaria): boolean {
    return this.igualRecursivo(this.raizNo, a.raizNo);
  }

  private igualRecursivo(no1: NoArvoreBinaria | null, no2: NoArvoreBinaria | null): boolean {
    if (no1 === null && no2 === null) {
      return true;
    }

    if (no1 === null || no2 === null) {
      return false;
    }

    return (
      no1.getInfo() === no2.getInfo() &&
      this.igualRecursivo(no1.getEsq(), no2.getEsq()) &&
      this.igualRecursivo(no1.getDir(), no2.getDir())
    );
  }

  public imprimePre(): string {
    const resultado: string[] = [];
    this.imprimePreRecursivo(this.raizNo, resultado);
    return resultado.join(' ');
  }

  private imprimePreRecursivo(no: NoArvoreBinaria | null, resultado: string[]): void {
    if (no === null) {
      return;
    }

    resultado.push(no.getInfo());
    this.imprimePreRecursivo(no.getEsq(), resultado);
    this.imprimePreRecursivo(no.getDir(), resultado);
  }

  public imprimeSim(): string {
    const resultado: string[] = [];
    this.imprimeSimRecursivo(this.raizNo, resultado);
    return resultado.join(' ');
  }

  private imprimeSimRecursivo(no: NoArvoreBinaria | null, resultado: string[]): void {
    if (no === null) {
      return;
    }

    this.imprimeSimRecursivo(no.getEsq(), resultado);
    resultado.push(no.getInfo());
    this.imprimeSimRecursivo(no.getDir(), resultado);
  }

  public imprimePos(): string {
    const resultado: string[] = [];
    this.imprimePosRecursivo(this.raizNo, resultado);
    return resultado.join(' ');
  }

  private imprimePosRecursivo(no: NoArvoreBinaria | null, resultado: string[]): void {
    if (no === null) {
      return;
    }

    this.imprimePosRecursivo(no.getEsq(), resultado);
    this.imprimePosRecursivo(no.getDir(), resultado);
    resultado.push(no.getInfo());
  }

  public imprime(): void {
    console.log(`Pré-ordem:    ${this.imprimePre()}`);
    console.log(`In-ordem:     ${this.imprimeSim()}`);
    console.log(`Pós-ordem:    ${this.imprimePos()}`);
  }

  public toString(): string {
    return `Árvore Binária: ${this.imprimePre()}`;
  }
}
