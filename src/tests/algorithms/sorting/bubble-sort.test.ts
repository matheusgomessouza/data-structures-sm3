import { describe, expect, it } from 'vitest';

import { bubbleSort } from '@/algorithms/sorting/bubble-sort';

describe('bubbleSort', () => {
  it.skip('sorts numbers in ascending order', () => {
    const input = [5, 2, 9, 1, 5, 6];

    const result = bubbleSort(input);

    expect(result).toEqual([1, 2, 5, 5, 6, 9]);
    expect(input).toEqual([5, 2, 9, 1, 5, 6]);
  });

  it.skip('returns empty and single-element arrays unchanged', () => {
    expect(bubbleSort([])).toEqual([]);
    expect(bubbleSort([42])).toEqual([42]);
  });
});
