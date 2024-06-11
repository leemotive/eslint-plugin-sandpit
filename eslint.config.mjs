import jsLintConfig from './src/configs/js.mjs';

export default [
  ...jsLintConfig,
  {
    ignores: [
      'coverage',
      'lib',
      'es',
      'dist',
      'node_modules',
      'typings/eslint',
      'typings/eslint-plugin-vue',
      'typings/eslint-utils',
      'typings/vue-eslint-parser',
    ],
    rules: {
      'no-underscore-dangle': [2, {allow: ['__dirname', '__filename']}]
    },
  },
];
