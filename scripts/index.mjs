import path from 'path';
import fsp from 'fs/promises';
import os from 'os';
import { toCamelCase } from 'yatter';

const files = await fsp.readdir(path.resolve(process.cwd(), 'src/rules'));

const rules = files.filter(file => file !== 'index.mjs');

const names = rules.map(rule => [
  toCamelCase(rule.replace(/\.mjs$/, '')),
  rule,
]);

const [importStatements, exportGroup] = names.reduce(
  (acc, name) => {
    acc[0].push(`import ${name[0]} from './${name[1]}';`);
    acc[1].push(`  '${name[1]}': ${name[0]},`);
    return acc;
  },
  [[], []],
);

const script = `
${importStatements.join(os.EOL)}

export default {
${exportGroup.join(os.EOL)}
}
`;

fsp.writeFile(path.resolve(process.cwd(), 'src/rules/index.mjs'), script);
