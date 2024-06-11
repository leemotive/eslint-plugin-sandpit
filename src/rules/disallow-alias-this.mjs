/** @type {import('eslint').Rule.RuleModule} */
const disallowAliasThis = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'prefer to use arrow function',
      recommended: true,
    },
    fixable: undefined,
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (['ArrayPattern', 'ObjectPattern'].includes(node.id.type)) {
          return;
        }

        if (node.init?.type === 'ThisExpression') {
          context.report({
            node,
            loc: node.loc,
            message: 'Please use arrow function instead',
          });
        }
      },
      AssignmentExpression(node) {
        if (['ArrayPattern', 'ObjectPattern'].includes(node.left.type)) {
          return;
        }
        if (node.right.type === 'ThisExpression') {
          context.report({
            node,
            loc: node.loc,
            message: 'Please use arrow function instead',
          });
        }
      },
    };
  },
};

export default disallowAliasThis;
