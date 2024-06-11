import sandpit from '../plugin.mjs';

/** @type {import('eslint').Linter.Config } */
const jsConfig = [
  {
    plugins: {
      sandpit,
    },
    rules: {
      'sandpit/disallow-keywords-as-identifier': ['error'],
      'sandpit/disallow-alias-this': ['error'],
      'sandpit/no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'accumulator', // for reduce accumulators
            'e', // for e.returnvalue
            'ctx', // for Koa routing
            'context', // for Koa routing
            'req', // for Express requests
            'request', // for Express requests
            'res', // for Express responses
            'response', // for Express responses
            '$scope', // for Angular 1 scopes
            'staticContext', // for ReactRouter context
            'state', // for vuex mutation
            'el', // for dom
          ],
        },
      ],
    },
  },
];

export default jsConfig;
