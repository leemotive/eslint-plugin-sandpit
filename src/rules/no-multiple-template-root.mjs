import utils from 'eslint-plugin-vue/lib/utils'

/** @type {import('eslint').Rule.RuleModule} */
const noMultipleTemplateRoot = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow adding multiple root nodes to the template',
      url: 'https://eslint.vuejs.org/rules/no-multiple-template-root.html',
    },
    fixable: undefined,
  },
  create(context) {
    const {sourceCode} = context;
    return {
      Program(program) {
        const element = program.templateBody;
        if (element == null) {
          return;
        }

        const rootElements = [];
        let extraText = null;
        let extraElement = null;
        let vIf = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const child of element.children) {
          if (child.name === 'page-meta') {
            if (rootElements.length) {
              context.report({
                node: child,
                loc: child.loc,
                message: 'The page-meta element should be the first element',
              });
              return;
            }
            // eslint-disable-next-line no-continue
            continue;
          }
          if (child.type === 'VElement') {
            if (rootElements.length === 0) {
              rootElements.push(child);
              vIf = utils.hasDirective(child, 'if');
            } else if (vIf && utils.hasDirective(child, 'else-if')) {
              rootElements.push(child);
            } else if (vIf && utils.hasDirective(child, 'else')) {
              rootElements.push(child);
              vIf = false;
            } else {
              extraElement = child;
            }
          } else if (sourceCode.getText(child).trim() !== '') {
            extraText = child;
          }
        }

        if (extraText != null) {
          context.report({
            node: extraText,
            loc: extraText.loc,
            message: 'The template root requires an element rather than texts.',
          });
        } else if (extraElement != null) {
          context.report({
            node: extraElement,
            loc: extraElement.loc,
            message: 'The template root requires exactly one element.',
          });
        } else {
          // eslint-disable-next-line no-restricted-syntax
          for (const ele of rootElements) {
            const tag = ele.startTag;
            const { name } = ele;

            if (name === 'template' || name === 'slot') {
              context.report({
                node: tag,
                loc: tag.loc,
                message: "The template root disallows '<{{name}}>' elements.",
                data: { name },
              });
            }
            if (utils.hasDirective(ele, 'for')) {
              context.report({
                node: tag,
                loc: tag.loc,
                message: "The template root disallows 'v-for' directives.",
              });
            }
          }
        }
      },
    };
  },
};

export default noMultipleTemplateRoot;
