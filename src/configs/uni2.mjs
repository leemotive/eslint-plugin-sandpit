/** @type { import('eslint').Linter.Config } */
const uni2Config = {
  plugins: ['sandpit'],
  rules: {
    'vue/no-multiple-template-root': 'off',

    'sandpit/no-multiple-template-root': 'error',
    'sandpit/disallow-mp-query': 'error',
    'sandpit/prefer-array-class-and-style': 'error',
  },
};

export default uni2Config;
