import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: ['src/**/*.{ts,tsx,graphql}'],
  generates: {
    './src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node'
      ],
      config: {
        skipTypename: false,        
        useTypeImports: true 
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;