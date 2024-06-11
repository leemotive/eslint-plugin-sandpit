/** @type {import('eslint').Rule.RuleModule} */
const disallowMpQuery = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'acquire page params from this.$root.$mp.query is not safe',
      recommended: true,
    },
    fixable: undefined,
  },
  create(context) {
    return {
      MemberExpression(node) {
        const names = '$root.$mp.query'.split('.').reverse()
        let exp = node;
        for (const name of names) {
          if (exp.property?.name !== name) {
            return;
          }
          exp = exp.object;
        }
        if (exp?.type !== 'ThisExpression') {
          return;
        }

        context.report({
          node: exp,
          loc: exp.loc,
          message: 'this.$root.$mp.query is not recommended, prefer to acquire from page onLoad',
        });
      },
    };
  },
};

export default disallowMpQuery;
