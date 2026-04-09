import { afterEach, describe, expect, it, vi } from 'vitest';
import { Calc, NoLista, Pilha, runPilhaMain } from '@/data-structures/stacks';

describe('NoLista', () => {
  it('should initialize info/prox and expose accessors', () => {
    const proximo = new NoLista(20);
    const no = new NoLista(10, proximo);

    expect(no.getInfo()).toBe(10);
    expect(no.getProx()).toBe(proximo);

    no.setInfo(15);
    no.setProx(null);

    expect(no.getInfo()).toBe(15);
    expect(no.getProx()).toBeNull();
    expect(no.toString()).toBe('15');
  });
});

describe('Pilha', () => {
  it('should start empty and allow push/pop/top', () => {
    const pilha = new Pilha();

    expect(pilha.vazia()).toBe(true);

    pilha.push(3);
    pilha.push(5);

    expect(pilha.vazia()).toBe(false);
    expect(pilha.top()).toBe(5);
    expect(pilha.pop()).toBe(5);
    expect(pilha.top()).toBe(3);
    expect(pilha.pop()).toBe(3);
    expect(pilha.vazia()).toBe(true);
  });

  it('should throw on pop/top when empty', () => {
    const pilha = new Pilha();

    expect(() => pilha.pop()).toThrowError('Pilha vazia.');
    expect(() => pilha.top()).toThrowError('Pilha vazia.');
  });

  it('should clear nodes with libera', () => {
    const pilha = new Pilha();

    pilha.push(1);
    pilha.push(2);
    pilha.push(3);

    pilha.libera();

    expect(pilha.vazia()).toBe(true);
    expect(() => pilha.top()).toThrowError('Pilha vazia.');
  });
});

describe('Calc', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should push operand and print formatted top', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const calc = new Calc('%.2f\n');

    calc.operando(3);

    expect(calc.top()).toBe(3);
    expect(logSpy).toHaveBeenCalledWith('3.00');
  });

  it('should execute operations preserving order for subtraction and division', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const calc = new Calc('%.2f\n');

    calc.operando(10);
    calc.operando(4);
    calc.operador('-');

    expect(calc.top()).toBe(6);

    calc.operando(3);
    calc.operador('/');

    expect(calc.top()).toBe(2);
    expect(logSpy).toHaveBeenLastCalledWith('2.00');
  });

  it('should treat missing operands as zero', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const calc = new Calc('%.1f\n');

    calc.operador('+');

    expect(calc.top()).toBe(0);
    expect(logSpy).toHaveBeenCalledWith('0.0');
  });

  it('should print error on division by zero and keep stack state', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const calc = new Calc('%.2f\n');

    calc.operando(7);
    calc.operando(0);
    calc.operador('/');

    expect(errorSpy).toHaveBeenCalledWith('Divisao por zero.');
    expect(calc.top()).toBe(0);
    expect(logSpy).toHaveBeenNthCalledWith(1, '7.00');
    expect(logSpy).toHaveBeenNthCalledWith(2, '0.00');
  });
});

describe('runPilhaMain', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reproduce the sample output sequence', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    runPilhaMain(['3', '5', '8', '*', '+', '7', '/', 'q'], '%.2f\n');

    expect(logSpy).toHaveBeenNthCalledWith(1, '3.00');
    expect(logSpy).toHaveBeenNthCalledWith(2, '5.00');
    expect(logSpy).toHaveBeenNthCalledWith(3, '8.00');
    expect(logSpy).toHaveBeenNthCalledWith(4, '40.00');
    expect(logSpy).toHaveBeenNthCalledWith(5, '43.00');
    expect(logSpy).toHaveBeenNthCalledWith(6, '7.00');
    expect(logSpy).toHaveBeenNthCalledWith(7, '6.14');
  });

  it('should print error for invalid token', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    runPilhaMain(['2', 'x', 'q']);

    expect(errorSpy).toHaveBeenCalledWith('Entrada invalida: x');
  });
});
