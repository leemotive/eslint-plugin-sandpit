/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import vueEslintParser from 'vue-eslint-parser'
import rule from '../src/rules/no-multiple-template-root.mjs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
  }
});
ruleTester.run('no-multiple-template-root', rule, {
  valid: ['<template><div></div></template>', '<template><page-meta></page-meta><div></div></template>'],
  invalid: [
    {
      code: '<template><div></div><div></div></template>',
      errors: ['The template root requires exactly one element.'],
    },
    {
      code: '<template><div></div><page-meta></page-meta></template>',
      errors: ['The page-meta element should be the first element'],
    },
    {
      code: '<template><page-meta></page-meta><div></div><span></span></template>',
      errors: ['The template root requires exactly one element.'],
    },
  ],
});
