/**
 * @fileoverview prefer Pascal case file name
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import eslintParser from '@babel/eslint-parser';
import rule from '../src/rules/pascal-router-vue-file.mjs';


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: eslintParser,
    parserOptions: {
      requireConfigFile: false
    }
  },
});
ruleTester.run('pascal-router-vue-file', rule, {
  valid: ['import("@/Index.vue")'],
  invalid: [
    {
      code: '{component: () => import("@/index.vue")}',
      errors: [{ message: 'use pascal case' }],
    },
  ],
});
