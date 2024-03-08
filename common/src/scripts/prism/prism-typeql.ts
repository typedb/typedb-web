import Prism from "prismjs";

Prism.languages["typeql"] = {
    comment: {
        pattern: /#.*/,
    },
    error: {
        pattern: /ERROR:.*/,
    },
    string: {
        pattern: /(".*?")|('.*?')/,
    },
    keyword: {
        pattern:
            /((?<![-?$])\b)(as|sub!|sub|has|owns|abstract|relates|plays|value|match|isa!|isa|is|contains|regex|iid|label|define|undefine|get|insert|delete|aggregate|std|median|mean|max|min|sum|count|group|where|limit|offset|sort|asc|desc|when|then|fetch|rule|like|floor|ceil|round|abs|or|not)((?!-)\b)/,
        alias: "keyword",
    },
    annotation: {
        pattern: /((?<![-?$])\b)(@key|@unique|@card)((?!-)\b)/,
        alias: "annotation",
    },
    type: {
        pattern: /((?<![-?$])\b)(entity|relation|attribute|thing)((?!-)\b)/,
        alias: "type",
    },
    modifier: {
        pattern: /((?<![-?$])\b)(boolean|double|long|string|datetime)((?!-)\b)/,
        alias: "modifier",
    },
    special: {
        pattern: /typeql>>|answers>>|\.\.\./,
        alias: "special",
    },
    variable: {
        pattern: /[$?][-a-zA-Z_0-9]+/,
        alias: "variable",
    },
    datetime: {
        pattern: /\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(:\d{2})?)?)?/,
        alias: "datetime",
    },
    number: {
        pattern: /((?<![-?$])\b| -)[0-9]+(\.[0-9][0-9]*)?\b/,
        alias: "number",
    },
    constant: {
        pattern: /((?<![-?$])\b)(true|false)((?!-)\b)/,
        alias: "constant",
    },
    operator: {
        pattern: /=|;|\.|\+|\*|\/|\^|,|\(|\)|:|{|}|\[|]|!=|>|<|>=|<=/,
        alias: "operator",
    },
    spaced_operator: {
        pattern: / (-) /,
        alias: "operator",
    }
};
