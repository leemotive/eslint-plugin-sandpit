import eslintParser from '@babel/eslint-parser';
import vueEslintParser from 'vue-eslint-parser';

/** @type { import('eslint').Linter.Config } */
const vueBaseConfig = {
  parser: vueEslintParser,
  parserOptions: {
    parser: eslintParser,
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue'],
  rules: {
    // essential
    'vue/multi-word-component-names': ['error', { ignores: ['index'] }],

    // recommended
    'vue/order-in-components': 'error',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'CONDITIONALS',
          'LIST_RENDERING',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
        ],
        alphabetical: false,
      },
    ],

    // strongly-recommended
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'never', component: 'any' } }],
    'vue/attribute-hyphenation': 'error',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-slot-style': [
      'warn',
      {
        atComponent: 'v-slot',
        default: 'v-slot',
        named: 'longform',
      },
    ],
    'vue/html-indent': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
  },
};

export default vueBaseConfig;
