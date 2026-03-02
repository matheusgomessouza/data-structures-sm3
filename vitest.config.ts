import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/algorithms/**/*.ts', 'src/data-structures/**/*.ts'],
      thresholds: {
        // statements: 90,
        // branches: 90,
        // functions: 90,
        // lines: 90,
      },
    },
  },
});
