import { performance } from 'node:perf_hooks';
import { bubbleSort } from '../algorithms/sorting/bubble-sort';
import { mergeSort } from '../algorithms/sorting/merge-sort';
import { quickSort } from '../algorithms/sorting/quick-sort';

export function linearStructureGenerator(size: number, intervalStart: 0 | 1 = 1): number[] {
  if (!Number.isInteger(size) || size < 0) {
    throw new RangeError('size must be a non-negative integer');
  }

  const result = Array.from({ length: size }, (_, index) => index + intervalStart);

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = result[index]!;

    result[index] = result[randomIndex]!;
    result[randomIndex] = current;
  }

  return result;
}

interface BenchmarkRow {
  size: number;
  bubbleSortMs: number;
  mergeSortMs: number;
  quickSortMs: number;
}

const DATASET_SIZES = [10 ** 1, 10 ** 2, 10 ** 3, 10 ** 4] as const;

function measureExecutionTimeMs(callback: () => void): number {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();

  return endTime - startTime;
}

function benchmarkSortsForSize(size: number): BenchmarkRow {
  const shuffledDataset = linearStructureGenerator(size, 1);

  const bubbleInput = [...shuffledDataset];
  const mergeInput = [...shuffledDataset];
  const quickInput = [...shuffledDataset];

  const bubbleSortMs = measureExecutionTimeMs((): void => {
    bubbleSort(bubbleInput);
  });

  const mergeSortMs = measureExecutionTimeMs((): void => {
    mergeSort(mergeInput);
  });

  const quickSortMs = measureExecutionTimeMs((): void => {
    quickSort(quickInput);
  });

  return {
    size,
    bubbleSortMs,
    mergeSortMs,
    quickSortMs,
  };
}

function formatMs(value: number): number {
  return Number(value.toFixed(3));
}

function buildGrowthRatios(values: number[]): string {
  const ranges: string[] = [];

  for (let index = 1; index < values.length; index++) {
    const previousValue = values[index - 1]!;
    const currentValue = values[index]!;
    const ratio = previousValue === 0 ? Number.POSITIVE_INFINITY : currentValue / previousValue;
    const formattedRatio = Number.isFinite(ratio) ? `${ratio.toFixed(2)}x` : 'inf';

    ranges.push(`${DATASET_SIZES[index - 1]}->${DATASET_SIZES[index]}: ${formattedRatio}`);
  }

  return ranges.join(' | ');
}

function buildPerformanceAnalysis(results: BenchmarkRow[]): string[] {
  const bubbleTimes = results.map((row) => row.bubbleSortMs);
  const mergeTimes = results.map((row) => row.mergeSortMs);
  const quickTimes = results.map((row) => row.quickSortMs);

  const largestCase = results[results.length - 1]!;
  const ranking = [
    { algorithm: 'Bubble Sort', time: largestCase.bubbleSortMs },
    { algorithm: 'Merge Sort', time: largestCase.mergeSortMs },
    { algorithm: 'Quick Sort', time: largestCase.quickSortMs },
  ].sort((first, second) => first.time - second.time);

  const analysis: string[] = [];

  analysis.push(
    `Bubble Sort (O(n^2)) mostrou crescimento acentuado: ${buildGrowthRatios(bubbleTimes)}.`,
  );
  analysis.push(
    `Merge Sort (O(n log n)) cresceu de forma mais controlada: ${buildGrowthRatios(mergeTimes)}.`,
  );
  analysis.push(
    `Quick Sort medio (O(n log n), pior caso O(n^2)) teve comportamento: ${buildGrowthRatios(quickTimes)}.`,
  );
  analysis.push(
    `No maior conjunto (n=${largestCase.size}), ordem observada: ${ranking[0]!.algorithm}, ${ranking[1]!.algorithm}, ${ranking[2]!.algorithm}.`,
  );
  analysis.push(
    'A tendencia geral confirma a teoria: Bubble tende a degradar mais rapido, enquanto Merge e Quick escalam melhor em entradas embaralhadas.',
  );

  return analysis;
}

function printBenchmarkReport(results: BenchmarkRow[], analysis: string[]): void {
  const tableRows = results.map((row) => ({
    size: row.size,
    bubbleSortMs: formatMs(row.bubbleSortMs),
    mergeSortMs: formatMs(row.mergeSortMs),
    quickSortMs: formatMs(row.quickSortMs),
  }));

  console.log('\nExecution time report (ms):');
  console.table(tableRows);

  console.log('\nPerformance analysis:');
  for (const line of analysis) {
    console.log(`- ${line}`);
  }
}

export function runSortingBenchmarks(): { results: BenchmarkRow[]; analysis: string[] } {
  const results = DATASET_SIZES.map((size) => benchmarkSortsForSize(size));
  const analysis = buildPerformanceAnalysis(results);

  printBenchmarkReport(results, analysis);

  return { results, analysis };
}

function isDirectExecution(): boolean {
  const currentEntryFile = process.argv[1];

  if (!currentEntryFile) {
    return false;
  }

  return (
    currentEntryFile.endsWith('linear-structure-generator.ts') ||
    currentEntryFile.endsWith('linear-structure-generator.js')
  );
}

if (isDirectExecution()) {
  runSortingBenchmarks();
}

// npm run build && node dist/data-structures/linear-structure-generator.js para executar os benchmarks diretamente.
