import { describe, expect, it } from 'vitest';
import { binarySearch } from '@/algorithms/searching/binary-search';

describe('binarySearch', () => {
  it('should find an existing number in a sorted array', () => {
    expect(binarySearch([1, 3, 5, 7, 9], 7)).toBe(3);
  });

  it('should find an existing string in a sorted array', () => {
    expect(binarySearch(['apple', 'banana', 'cherry'], 'banana')).toBe(1);
  });

  it('should return -1 when the target does not exist', () => {
    expect(binarySearch([1, 2, 4, 8, 16], 3)).toBe(-1);
  });

  it('should return -1 for an empty array', () => {
    expect(binarySearch([], 10)).toBe(-1);
  });

  it('should handle single-element arrays', () => {
    expect(binarySearch([42], 42)).toBe(0);
    expect(binarySearch([42], 24)).toBe(-1);
  });

  it('should find first and last positions', () => {
    const values = [2, 4, 6, 8, 10, 12];

    expect(binarySearch(values, 2)).toBe(0);
    expect(binarySearch(values, 12)).toBe(values.length - 1);
  });

  it('should return an index pointing to the target when duplicates exist', () => {
    const values = [1, 2, 2, 2, 3, 4];
    const index = binarySearch(values, 2);

    expect(index).not.toBe(-1);

    if (index !== -1) {
      expect(values[index]).toBe(2);
    }
  });
});
