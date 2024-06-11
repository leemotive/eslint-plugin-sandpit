import path from 'path';

/** @type {import('eslint').Linter.Config */
const vue3Config = {
  extends: ['plugin:vue/vue3-strongly-recommended', path.resolve(__dirname, 'vue-base.js')],
};

export default vue3Config;
