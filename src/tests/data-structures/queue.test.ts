import { describe, expect, it } from 'vitest';
import { FilaVetor } from '@/data-structures/queue';

describe('FilaVetor - construction and core operations', () => {
  it('should create an empty queue with valid capacity', () => {
    const fila = new FilaVetor(3);

    expect(fila.isEmpty()).toBe(true);
    expect(fila.toString()).toBe('');
  });

  it('should throw for invalid capacity', () => {
    expect(() => new FilaVetor(0)).toThrowError('Capacidade da fila deve ser um inteiro positivo.');
    expect(() => new FilaVetor(-1)).toThrowError(
      'Capacidade da fila deve ser um inteiro positivo.',
    );
    expect(() => new FilaVetor(2.5)).toThrowError(
      'Capacidade da fila deve ser um inteiro positivo.',
    );
  });

  it('should enqueue and dequeue preserving FIFO order', () => {
    const fila = new FilaVetor(4);

    fila.enqueue(10);
    fila.enqueue(20);
    fila.enqueue(30);

    expect(fila.toString()).toBe('10 20 30');
    expect(fila.dequeue()).toBe(10);
    expect(fila.dequeue()).toBe(20);
    expect(fila.toString()).toBe('30');
    expect(fila.isEmpty()).toBe(false);
    expect(fila.dequeue()).toBe(30);
    expect(fila.isEmpty()).toBe(true);
  });

  it('should support circular indexing without storing end attribute', () => {
    const fila = new FilaVetor(3);

    fila.enqueue(1);
    fila.enqueue(2);
    fila.enqueue(3);
    expect(fila.dequeue()).toBe(1);
    fila.enqueue(4);

    expect(fila.toString()).toBe('2 3 4');
    expect(fila.dequeue()).toBe(2);
    expect(fila.dequeue()).toBe(3);
    expect(fila.dequeue()).toBe(4);
    expect(fila.isEmpty()).toBe(true);
  });

  it('should throw on enqueue when full and dequeue when empty', () => {
    const fila = new FilaVetor(2);

    expect(() => fila.dequeue()).toThrowError('Fila vazia.');

    fila.enqueue(7);
    fila.enqueue(8);

    expect(() => fila.enqueue(9)).toThrowError('Fila cheia.');
  });

  it('should reset queue state', () => {
    const fila = new FilaVetor(3);

    fila.enqueue(11);
    fila.enqueue(12);
    fila.reset();

    expect(fila.isEmpty()).toBe(true);
    expect(fila.toString()).toBe('');
    expect(() => fila.dequeue()).toThrowError('Fila vazia.');
  });
});

describe('FilaVetor - combine operations', () => {
  it('should concatenate queues without mutating originals', () => {
    const f1 = new FilaVetor(5);
    const f2 = new FilaVetor(5);

    f1.enqueue(3);
    f1.enqueue(1);
    f1.enqueue(5);

    f2.enqueue(7);
    f2.enqueue(8);
    f2.enqueue(2);

    const f3 = f1.concatena(f2);

    expect(f3.toString()).toBe('3 1 5 7 8 2');
    expect(f1.toString()).toBe('3 1 5');
    expect(f2.toString()).toBe('7 8 2');
  });

  it('should merge queues interleaving values without mutating originals', () => {
    const f1 = new FilaVetor(5);
    const f2 = new FilaVetor(5);

    f1.enqueue(3);
    f1.enqueue(1);
    f1.enqueue(5);

    f2.enqueue(7);
    f2.enqueue(8);
    f2.enqueue(2);

    const f3 = f1.merge(f2);

    expect(f3.toString()).toBe('3 7 1 8 5 2');
    expect(f1.toString()).toBe('3 1 5');
    expect(f2.toString()).toBe('7 8 2');
  });

  it('should merge queues with different sizes and append remaining values', () => {
    const f1 = new FilaVetor(5);
    const f2 = new FilaVetor(5);

    f1.enqueue(10);
    f1.enqueue(20);

    f2.enqueue(1);
    f2.enqueue(2);
    f2.enqueue(3);
    f2.enqueue(4);

    const f3 = f1.merge(f2);

    expect(f3.toString()).toBe('10 1 20 2 3 4');
    expect(f1.toString()).toBe('10 20');
    expect(f2.toString()).toBe('1 2 3 4');
  });
});
