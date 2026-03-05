import { describe, expect, it } from 'vitest';
import { quickSort } from '@/algorithms/sorting/quick-sort';

describe('quickSort', () => {
  it('should sort an array of numbers in ascending order', () => {
    expect(quickSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it('should sort an array of strings in ascending order', () => {
    expect(quickSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should return an empty array unchanged', () => {
    expect(quickSort([])).toEqual([]);
  });

  it('should return a single-element array unchanged', () => {
    expect(quickSort([42])).toEqual([42]);
  });

  it('should handle an already sorted array', () => {
    expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle a reverse-sorted array', () => {
    expect(quickSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle an array with duplicate elements', () => {
    expect(quickSort([3, 1, 3, 1, 3])).toEqual([1, 1, 3, 3, 3]);
  });

  it('should mutate the original array', () => {
    const values = [3, 2, 1];
    const result = quickSort(values);

    expect(result).toBe(values);
    expect(values).toEqual([1, 2, 3]);
  });
});
