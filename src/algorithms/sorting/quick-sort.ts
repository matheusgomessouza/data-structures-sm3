export function quickSort<T extends number | string>(items: T[]): T[] {
  if (items.length <= 1) {
    return items;
  }

  const swap = (leftIndex: number, rightIndex: number): void => {
    if (leftIndex === rightIndex) {
      return;
    }

    const temporary = items[leftIndex]!;
    items[leftIndex] = items[rightIndex]!;
    items[rightIndex] = temporary;
  };

  const partition = (startIndex: number, endIndex: number): number => {
    const pivot = items[endIndex]!;
    let partitionIndex = startIndex - 1;

    for (let currentIndex = startIndex; currentIndex < endIndex; currentIndex++) {
      if (items[currentIndex]! <= pivot) {
        partitionIndex++;
        swap(partitionIndex, currentIndex);
      }
    }

    swap(partitionIndex + 1, endIndex);

    return partitionIndex + 1;
  };

  const sortRange = (startIndex: number, endIndex: number): void => {
    if (startIndex >= endIndex) {
      return;
    }

    const pivotIndex = partition(startIndex, endIndex);
    sortRange(startIndex, pivotIndex - 1);
    sortRange(pivotIndex + 1, endIndex);
  };

  sortRange(0, items.length - 1);

  return items;
}
