const utils = await import('eslint-plugin-vue/lib/utils');

/** @type {import('eslint').Rule.RuleModule} */
const preferArrayClassAndStyle = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'prefer use array expression when bind style or class',
      category: undefined,
    },
    fixable: undefined,
    schema: [],
  },
  /** @param {RuleContext} context */
  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      // eslint-disable-next-line func-names
      'VAttribute[directive=true][key.argument.name="class"][key.name.name="bind"][value.expression.type!="ArrayExpression"]':
        function (node) {
          context.report({
            node,
            loc: node.loc,
            message: 'expect array expression when bind class',
          });
        },

      // eslint-disable-next-line func-names
      'VAttribute[directive=true][key.argument.name="style"][key.name.name="bind"][value.expression.type!="ArrayExpression"]':
        function (node) {
          context.report({
            node,
            loc: node.loc,
            message: 'expect array expression when bind style',
          });
        },
    });
  },
};

export default preferArrayClassAndStyle;
