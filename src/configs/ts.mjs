import path from 'path';
import typescriptEslintParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config} */
const tsConfig = [
  {
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: path.resolve(process.cwd(), 'tsconfig.json'),
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  }
]

export default tsConfig;
