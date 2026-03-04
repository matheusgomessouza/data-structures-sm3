function merge<T extends number | string>(left: T[], right: T[]): T[] {
  const results: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (right[rightIndex]! > left[leftIndex]!) {
      results.push(left[leftIndex]!);
      leftIndex++;
    } else {
      results.push(right[rightIndex]!);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    results.push(left[leftIndex]!);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    results.push(right[rightIndex]!);
    rightIndex++;
  }

  return results;
}

export function mergeSort<T extends number | string>(items: T[]): T[] {
  if (items.length <= 1) {
    return items;
  }

  const middle = Math.floor(items.length / 2);
  const left = items.slice(0, middle);
  const right = items.slice(middle);

  const merged = merge(mergeSort(left), mergeSort(right));

  // Copy merged results back into the original array to keep the API in-place.
  for (let i = 0; i < merged.length; i++) {
    items[i] = merged[i]!;
  }

  return items;
}
