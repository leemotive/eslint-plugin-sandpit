/** @type {import('eslint').Linter.Config} */
const mpConfig = {
  globals: {
    uni: 'readonly',
    wx: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
  },
};

export default mpConfig;
