import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: './openapi.json',
    },
    output: {
      target: './src/services/api/generated.ts',
      schemas: './src/services/api/model',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/libs/axios/index.ts',
          name: 'axios',
        },
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: true,
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
})
