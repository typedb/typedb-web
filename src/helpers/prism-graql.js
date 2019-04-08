module.exports = {
    graql: {
        comment: {
            pattern: /#.*/,
            alias: 'comment'
        },
        string: {
            pattern: /".*?"/,
            alias: 'string'
        },
        keyword: {
            pattern: /((?:(?![-a-zA-Z_0-9]|\$).)|^|\s)(as|sub|sub!|has|key|abstract|relates|plays|datatype|boolean|double|long|string|date|match|isa|isa!|contains|regex|val|via|id|label|define|undefine|get|insert|delete|aggregate|compute|std|median|mean|max|min|sum|count|group|path|centrality|cluster|degree|k-core|where|from|to|in|of|limit|offset|sort|asc|desc|when|then|commit)(?![-a-zA-Z_0-9])/,
            alias: 'keyword',
            lookbehind: true
        },
        super: {
            pattern: /((?:(?![-a-zA-Z_0-9]|\$).)|^|\s)(entity|role|relation|attribute|rule|thing)(?![-a-zA-Z_0-9])/,
            alias: 'system',
            lookbehind: true
        },
        variable: {
            pattern: /\$[-a-zA-Z_0-9]+/,
            alias: 'variable'
        },
        type: {
            pattern: /[-a-zA-Z_][-a-zA-Z_0-9]*/,
            alias: 'function'
        },
        number: {
            pattern: /[0-9]+(\.[0-9][0-9]*)?/,
            alias: 'number'
        },
        operator: {
            pattern: /=|;|\.|\+|\-|\*|,|\(|\)|:|{|}|!=|>|<|>=|<=/,
            alias: 'operator'
        }
    }
};
