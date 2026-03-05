import { afterEach, describe, expect, it, vi } from 'vitest';
import { linearStructureGenerator } from '@/data-structures/linear-structure-generator';

describe('linearStructureGenerator', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should generate n distinct integers in the [1, n] interval by default', () => {
    const size = 10;
    const result = linearStructureGenerator(size);

    expect(result).toHaveLength(size);
    expect(new Set(result).size).toBe(size);
    expect([...result].sort((a, b) => a - b)).toEqual(
      Array.from({ length: size }, (_, index) => index + 1),
    );
  });

  it('should generate n distinct integers in the [0, n - 1] interval', () => {
    const size = 10;
    const result = linearStructureGenerator(size, 0);

    expect(result).toHaveLength(size);
    expect(new Set(result).size).toBe(size);
    expect([...result].sort((a, b) => a - b)).toEqual(
      Array.from({ length: size }, (_, index) => index),
    );
  });

  it('should return an empty array when size is zero', () => {
    expect(linearStructureGenerator(0)).toEqual([]);
  });

  it('should throw when size is not a non-negative integer', () => {
    expect(() => linearStructureGenerator(-1)).toThrow(RangeError);
    expect(() => linearStructureGenerator(2.5)).toThrow(RangeError);
  });

  it('should use randomness to shuffle generated values', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(linearStructureGenerator(4)).toEqual([2, 3, 4, 1]);
    expect(randomSpy).toHaveBeenCalledTimes(3);
  });
});
