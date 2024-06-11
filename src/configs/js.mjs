import path from 'path';
import globals from 'globals';
import eslintParser from "@babel/eslint-parser";
import importPlugin from 'eslint-plugin-import-flat';
import air from 'eslint-config-airbnb-base';
import {fixupPluginRules} from '@eslint/compat';
import { createCompat } from '../utils.mjs';

const compat = createCompat(import.meta.url);

const airbnb = compat.config(air);

airbnb.forEach(a => {
  if (a.plugins?.import) {
    a.plugins.import = fixupPluginRules(importPlugin);
  }
  /* a.languageOptions ??= {};
  a.languageOptions.parser = eslintParser; */
})
console.log()
/** @type {import('eslint').Linter.Config } */
const jsConfig = [
  ...airbnb,
  ...compat.extends('eslint-config-prettier'),
  {
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        requireConfigFile: false,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      }
    },
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    settings: {
      'import/extensions': ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.d.ts'],
      'import/resolver': {
        alias: {
          map: [['@', path.resolve(process.cwd(), 'src')]],
          extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.d.ts'],
        },
      },
    },
    rules: {
      'import/no-unresolved': ['error', { ignore: ['estree'] }],
      'import/extensions': ['error', 'never', { vue: 'ignorePackages', mjs: 'always' }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

      // Possible Errors
      'no-cond-assign': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],

      // Variables

      // Stylistic Issues
      'max-lines': ['warn', { max: 1000, skipComments: true, skipBlankLines: false }],
      'max-lines-per-function': ['warn', { max: 200, skipComments: true, skipBlankLines: false }],
      'no-bitwise': ['error', { allow: ['^', '~'], int32Hint: true }],
      'no-continue': 'warn',
      'no-plusplus': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'no-underscore-dangle': [
        'error',
        {
          allow: [],
          allowAfterThis: true,
          allowAfterSuper: true,
          enforceInMethodNames: false,
          enforceInClassFields: false,
        },
      ],

      // Best Practices
      'accessor-pairs': 'error',
      'class-methods-use-this': 'warn',
      'consistent-return': 'warn',
      eqeqeq: ['error', 'smart'],
      'no-empty-function': ['error', { allow: ['methods'] }],
      'no-param-reassign': 'off',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-useless-call': 'error',
      'wrap-iife': ['error', 'any'],

      // Node.js and CommonJs

      // ECMAScript 6
      'prefer-arrow-callback': ['error', { allowUnboundThis: true, allowNamedFunctions: true }],
      'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    },
  },
];

export default jsConfig;
