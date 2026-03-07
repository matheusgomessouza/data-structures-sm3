export function binarySearch<T extends number | string>(items: T[], target: T): number {
  if (items.length === 0) {
    return -1;
  }

  let leftIndex = 0;
  let rightIndex = items.length - 1;
  let didSwapBounds = false;

  do {
    didSwapBounds = false;

    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    const middleValue = items[middleIndex]!;

    if (middleValue === target) {
      return middleIndex;
    }

    if (middleValue < target) {
      const previousLeftIndex = leftIndex;
      leftIndex = middleIndex + 1;
      didSwapBounds = leftIndex !== previousLeftIndex;
    } else {
      const previousRightIndex = rightIndex;
      rightIndex = middleIndex - 1;
      didSwapBounds = rightIndex !== previousRightIndex;
    }
  } while (leftIndex <= rightIndex && didSwapBounds);

  return -1;
}
