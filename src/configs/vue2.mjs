import path from 'path';

/** @type {import('eslint').Linter.Config} */
const vue2Config = {
  extends: ['plugin:vue/strongly-recommended', path.resolve(__dirname, 'vue-base.js')],
};

export default vue2Config;
