import { describe, it, expect } from 'vitest';
import { mergeSort } from '@/algorithms/sorting/merge-sort';

describe('mergeSort', () => {
  it('should sort an array of numbers in ascending order', () => {
    expect(mergeSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it('should sort an array of strings in ascending order', () => {
    expect(mergeSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should return an empty array unchanged', () => {
    expect(mergeSort([])).toEqual([]);
  });

  it('should return a single-element array unchanged', () => {
    expect(mergeSort([42])).toEqual([42]);
  });

  it('should handle an already sorted array', () => {
    expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle a reverse-sorted array', () => {
    expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle an array with duplicate elements', () => {
    expect(mergeSort([3, 1, 3, 1, 3])).toEqual([1, 1, 3, 3, 3]);
  });

  it('should handle strings with duplicate elements', () => {
    expect(mergeSort(['a', 'c', 'a', 'b'])).toEqual(['a', 'a', 'b', 'c']);
  });
});
