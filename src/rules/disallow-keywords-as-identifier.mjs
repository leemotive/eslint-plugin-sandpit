const reservedWords = `
  await goto label yield
  static implements interface package private protected pubilc
  as from of let int double float boolean char symbol
  get set arguments eval
`
  .split(/\s+/)
  .filter(Boolean);

function getAllIdentifierNames(identifier) {
  const items = [identifier];

  const names = [];
  while (items.length) {
    const item = items.pop();

    if (item.type === 'Identifier') {
      names.push(item);
    } else if (item.type === 'ObjectPattern') {
      items.push(...item.properties);
    } else if (item.type === 'ArrayPattern') {
      items.push(...item.elements.filter(Boolean));
    } else if (item.type === 'Property') {
      items.push(item.value);
    }
  }

  return names;
}

/** @type {import('eslint').Rule.RuleModule} */
const disallowKeywordsIdentifier = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'some reserved word can be used as an identifier, but it is not recommended',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          forbidden: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
    ],
    fixable: undefined,
  },
  create(context) {
    const { ignore = [], forbidden = [] } = context.options[0] || {};
    return {
      VariableDeclarator(node) {
        const nameNodes = getAllIdentifierNames(node.id);

        const reserved = new Set(reservedWords.filter(w => !ignore.includes(w)).concat(forbidden));

        nameNodes.forEach(nameNode => {
          if (!reserved.has(nameNode.name)) {
            return;
          }
          context.report({
            node: nameNode,
            loc: nameNode.loc,
            message: `${nameNode.name} is reserved word, can not be used as an identifier`,
          });
        });
      },
    };
  },
};

export default disallowKeywordsIdentifier;
