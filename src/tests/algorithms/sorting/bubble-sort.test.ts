import { describe, expect, it } from 'vitest';
import { bubbleSort } from '@/algorithms/sorting/bubble-sort';

describe('Bubble Sort', () => {
  it('should sort an array of numbers in ascending order', () => {
    expect(bubbleSort([5, 2, 8, 1, 9])).toEqual([1, 2, 5, 8, 9]);
  });

  it('should sort an array of strings in ascending order', () => {
    expect(bubbleSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should return an empty array', () => {
    expect(bubbleSort([])).toEqual([]);
  });

  it('should return a single element array unchanged', () => {
    expect(bubbleSort([42])).toEqual([42]);
  });

  it('should handle an already sorted array', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle a reverse sorted array', () => {
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle duplicates', () => {
    expect(bubbleSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
  });

  it('should mutate the original array', () => {
    const arr = [3, 1, 2];
    const result = bubbleSort(arr);
    expect(result).toBe(arr);
  });
});
