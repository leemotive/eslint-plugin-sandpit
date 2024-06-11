/** @type {import('prettier').Options} */
const prettierOption = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
};

module.exports = prettierOption;
