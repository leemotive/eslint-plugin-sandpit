/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../src/rules/disallow-keywords-as-identifier.mjs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({});
ruleTester.run('disallow-keywords-as-identifier', rule, {
  valid: ['var name = "alexzander", age = 34;', { code: 'var from = 23;', options: [{ ignore: ['from'] }] }],

  invalid: [
    {
      code: 'var from = 0;',
      errors: [{ message: 'from is reserved word, can not be used as an identifier' }],
    },
    {
      code: 'var [{label: as}, from] = {}; ',
      errors: [
        { message: 'as is reserved word, can not be used as an identifier' },
        { message: 'from is reserved word, can not be used as an identifier' },
      ],
    },
    {
      code: 'var {af: label, default: [now]} = {};',
      errors: [{ message: 'label is reserved word, can not be used as an identifier' }],
    },
  ],
});
