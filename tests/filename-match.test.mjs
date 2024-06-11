/**
 * @fileoverview disallow the use of keywords as identifier
 * @author leemotive
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import path from 'path';
import { RuleTester } from 'eslint';
import rule from '../src/rules/filename-match.mjs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({});
ruleTester.run('filename-match', rule, {
  valid: [{ code: '', filename: path.resolve(process.cwd(), 'normal.js') }],
  invalid: [
    {
      code: '',
      filename: path.resolve(process.cwd(), 'file_name_Index.js'),
      errors: [{ message: 'The file name file_name_Index.js is not allowed, contains multi separator' }],
    },
    {
      code: '',
      filename: path.resolve(process.cwd(), '背景图.png'),
      errors: [{ message: 'The file name 背景图.png is not allowed, contains invalid character' }],
    },
  ],
});
