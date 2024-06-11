import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

export function dirfilename(url) {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);
  return {
    __filename,
    __dirname,
  }
}

export function createCompat(url) {
  const {__dirname} = dirfilename(url)
  const compat = new FlatCompat({
    baseDirectory: __dirname
  });
  return compat;
}


export default 34;
