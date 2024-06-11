import path from 'path';

/** @type {import('eslint').Rule.RuleModule} */
const pascalRouterVueFile = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'prefer Pascal case file name',
      recommended: true,
    },
    fixable: undefined,
  },
  create(context) {
    return {
      ImportExpression(node) {
        const { type, value, loc } = node.source;

        const { name, ext } = path.parse(value);

        if (type === 'Literal' && ext === '.vue' && !/[A-Z]/.test(name[0])) {
          context.report({
            node: node.source,
            loc,
            message: 'use pascal case',
          });
        }
      },
    };
  },
};

export default pascalRouterVueFile;
