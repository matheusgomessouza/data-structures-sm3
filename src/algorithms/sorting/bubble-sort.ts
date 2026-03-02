export function bubbleSort<T extends number | string>(items: T[]): T[] {
  if (items.length <= 1) {
    return items;
  }

  let swapped = true;

  do {
    swapped = false;
    for (let i = 0; i < items.length - 1; i++) {
      const current = items[i]!;
      const next = items[i + 1]!;

      if (current > next) {
        items[i] = next;
        items[i + 1] = current;
        swapped = true;
      }
    }
  } while (swapped);

  return items;
}
