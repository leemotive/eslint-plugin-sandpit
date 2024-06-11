import path from 'path';

const pwd = process.cwd();

const folderInvalidReg = /[^a-zA-Z-]/;
const fileInvalidReg = /[^a-zA-Z_-\d.@]/;

/** @type {import('eslint').Rule.RuleModule} */
const filenameMatch = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'file or folder name should not contain special characters.',
      recommended: true,
    },
    fixable: undefined,
  },
  create(context) {
    return {
      Program(node) {
        const {filename} = context;
        const relativePath = path.relative(pwd, filename);

        const paths = relativePath.split(path.sep);

        paths.forEach((p, index, { length }) => {
          const name = paths.slice(0, index + 1).join(path.sep);

          const type = index === length - 1 ? 'file' : 'folder';

          const nameInvalidReg = type === 'folder' ? folderInvalidReg : fileInvalidReg;

          if (nameInvalidReg.test(p)) {
            context.report({
              node,
              message: `The ${type} name ${name} is not allowed, contains invalid character`,
            });
            return;
          }

          let ruleTypeTotal = 0;
          if (/[A-Z]/.test(p)) {
            ruleTypeTotal++;
          }
          if (p.includes('-')) {
            ruleTypeTotal++;
          }
          if (p.includes('_')) {
            ruleTypeTotal++;
          }
          if (ruleTypeTotal > 1) {
            context.report({
              node,
              message: `The ${type} name ${name} is not allowed, contains multi separator`,
            });
          }

          if (type === 'folder') {
            return;
          }

          if (/(@).*\1/.test(p)) {
            context.report({
              node,
              message: `The file name ${name} is not allowed, contains multi @`,
            });
          }
        });
      },
    };
  },
};

export default filenameMatch;
