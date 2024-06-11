/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import rule from '../src/rules/disallow-alias-this.mjs'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ });
ruleTester.run('disallow-alias-this', rule, {
  valid: [''],
  invalid: [
    {
      code: 'var that = this;',
      errors: [{ message: 'Please use arrow function instead' }],
    },
    {
      code: 'var that; that = this;',
      errors: [{ message: 'Please use arrow function instead' }],
    },
  ],
});
