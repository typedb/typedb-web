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
            pattern: /(to|select|insert|delete|where|group|by|isa|has|as|value|id|of|plays-role|has-role|ako|limit|offset|order|format)(?![-\$a-zA-Z_0-9])/,
            alias: 'keyword'
        },
        special: {
            pattern: /graql>|results>|\.\.\./
        },
        month: {
            pattern: /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec(?!{-\$a-zA-Z_0-9})/,
            alias: 'number'
        },
        variable: {
            pattern: /\$[a-zA-Z_][-a-zA-Z_0-9]*(?![-\$a-zA-Z_0-9])/,
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
            pattern: /=|!=|>|<|>=|<=/,
            alias: 'operator'
        }
    };
}());
