# TypeScript Node DSA

Base profissional para estudo avançado de Estruturas de Dados e Algoritmos com Node.js + TypeScript.

## Stack

- Node.js LTS (>= 20)
- TypeScript (strict mode)
- `tsx@3.7.0` para desenvolvimento
- ESLint (flat config, type-aware)
- Prettier integrado ao ESLint
- Vitest + Coverage V8
- Husky + lint-staged
- Commitlint + Conventional Commits

## Estrutura

```text
src/
  algorithms/
    sorting/
    searching/
  data-structures/
  utils/
  types/
  tests/
```

## Scripts

- `npm run dev`: executa ambiente de desenvolvimento com `tsx watch`
- `npm run build`: gera build em `dist/`
- `npm run start`: executa build com source maps habilitados
- `npm run test`: roda testes com coverage
- `npm run test:watch`: roda testes em watch mode
- `npm run lint`: valida padrão de código
- `npm run lint:fix`: corrige problemas automáticos de lint
- `npm run format`: aplica formatação Prettier
- `npm run typecheck`: valida tipagem estrita sem emitir build

## Qualidade automatizada

- **pre-commit**: `lint-staged` + `typecheck`
- **pre-push**: `test`
- **CI**: pipeline preparado em `.github/workflows/ci.yml`

## Padrão de commits

Padrão Conventional Commits:

- `feat: add merge sort implementation`
- `fix: handle empty input in binary search`
- `test: add heap unit tests`
- `chore: update lint rules`

## Primeiros passos

```bash
npm install
npm run dev
```

## Próximas extensões recomendadas

- Criar barrel files por módulo (`index.ts`)
- Adicionar benchmarks para comparar algoritmos
- Criar testes parametrizados por categoria
- Adicionar documentação por complexidade (tempo/espaço)
