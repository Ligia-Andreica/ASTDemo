module.exports = function(babel) {
  var types = babel.types

  return {
    visitor: {

        // handle lists
        ArrayExpression: function(path) {
            path.replaceWith(
                types.callExpression(
                    types.memberExpression(types.memberExpression(types.identifier('Immutable'), types.identifier('List')), types.identifier('of')),
                    path.node.elements
                )
            )
        },

        // handle maps
        ObjectExpression: function(path) {

            if (path.parentPath.node.type === 'VariableDeclarator') {
                path.replaceWith(
                  types.callExpression(
                    types.memberExpression(types.identifier('Immutable'), types.identifier('Map')),
                    [path.node]
                  )
                )
            }
        },

        // handle get/ size
        MemberExpression: function(path) {
            if (path.node.property.type === 'Identifier' && path.node.property.name === 'length') {
                path.replaceWith(
                    types.memberExpression(path.node.object, types.identifier('size'))
                )
            }

            if (path.node.property.type === 'NumericLiteral' || path.node.property.type === 'StringLiteral') {
                    path.replaceWith(
                        types.callExpression(
                            types.memberExpression(path.node.object, types.identifier('get')),
                            [path.node.property]
                        )
                    )
            }
        },

        // handle set
        AssignmentExpression: function(path) {
            if (path.node.left.type === 'MemberExpression') {
                path.replaceWith(
                    types.callExpression(
                        types.memberExpression(path.node.left.object, types.identifier('set')),
                         [path.node.left.property, path.node.right,]
                    )
                )
            }
        }
    }
  }
}