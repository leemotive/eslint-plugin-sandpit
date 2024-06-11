/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import rule from '../src/rules/no-param-reassign.mjs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ });
ruleTester.run('no-param-reassign', rule, {
  valid: [
    '[].reduce((acc, item) => {acc += item; return acc;})',
    '[].forEach(item => {item = 34})',
    'callback(function eachItem(item) {item = 34})',
    'const k = {handle(data) {data = 32}}',
    'function eachRow(row) {row = 34}',
  ],
  invalid: [
    {
      code: 'function fun(param) {param = 34}',
      errors: [{ message: "Assignment to function parameter 'param'." }],
    },
    {
      code: 'forEach(function fun(item) {item = 34})',
      errors: [{ message: "Assignment to function parameter 'item'." }],
    },
    {
      code: '[].reduce((acc, item) => {item *= 2; acc += item; return acc;})',
      errors: [{ message: "Assignment to function parameter 'item'." }],
    },
    {
      code: 'function fun(param) {param.p = 34}',
      options: [{ props: true }],
      errors: [{ message: "Assignment to property of function parameter 'param'." }],
    },
  ],
});
