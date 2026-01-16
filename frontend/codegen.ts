import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.GRAPHQL_SCHEMA_URL ??
    '../backend/src/graphql/schemas/**/*.graphql',
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
      config: {
        skipTypename: false,
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
