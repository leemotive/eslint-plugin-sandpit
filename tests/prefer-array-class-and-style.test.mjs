/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import vueEslintParser from 'vue-eslint-parser';
import rule from '../src/rules/prefer-array-class-and-style.mjs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: vueEslintParser,
  }
});
ruleTester.run('prefer-array-class-and-style', rule, {
  valid: ['<template><div :class="[visibleClass]"></div></template>'],
  invalid: [
    {
      code: '<template><div :class="className"></div></template>',
      errors: ['expect array expression when bind class'],
    },
    {
      code: '<template><div :style="{color: bgColor}"></div></template>',
      errors: ['expect array expression when bind style'],
    },
  ],
});
