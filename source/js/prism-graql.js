(function () {
    Prism.languages.graql = {
        comment: {
            pattern: /#.*/,
            alias: 'comment'
        },
        string: {
            pattern: /".*?"/,
            alias: 'string'
        },
        keyword: {
            pattern: /(match|ask|insert|delete|select|isa|ako|plays-role|has-role|has-scope|datatype|is-abstract|has|value|id|of|limit|offset|order|by)(?![-\$a-zA-Z_0-9])/,
            alias: 'keyword'
        },
        special: {
            pattern: /graql>|results>|\.\.\./
        },
        variable: {
            pattern: /\$[-a-zA-Z_0-9]+(?![-\$a-zA-Z_0-9])/,
            alias: 'variable'
        },
        type: {
            pattern: /[-a-zA-Z_][-a-zA-Z_0-9]*(?![-\$a-zA-Z_0-9])/,
            alias: 'function'
        },
        number: {
            pattern: /[0-9]+(\.[0-9][0-9]*)?/,
            alias: 'number'
        },
        operator: {
            pattern: /=|!=|>|<|>=|<=|contains|regex/,
            alias: 'operator'
        }
    };
}());
