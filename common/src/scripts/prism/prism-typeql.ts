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
            /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(as|sub!|sub|has|owns|abstract|relates|plays|value|match|isa!|isa|contains|regex|iid|label|define|undefine|get|insert|delete|aggregate|std|median|mean|max|min|sum|count|group|where|limit|offset|sort|asc|desc|when|then|fetch|rule|like|floor|ceil|round|abs|or|not)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    annotation: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(@key|@unique|@card)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    type: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(entity|relation|attribute|thing)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    modifier: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(boolean|double|long|string|datetime)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    special: {
        pattern: /typeql>>|answers>>|\.\.\./,
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
        // note: [^a-zA-Z0-9-_?$] is equivalent to (?:(?![-a-zA-Z_0-9]|\$|\?).) used above
        pattern: /([^a-zA-Z0-9-_?$]|^|\s)[0-9]+(\.[0-9][0-9]*)?(?![a-zA-Z0-9_])/,
        lookbehind: true,
        alias: "number",
    },
    negated_number: {
        pattern: /([^a-zA-Z0-9-_?$]|^|\s)-[0-9]+(\.[0-9][0-9]*)?(?![a-zA-Z0-9_])/,
        lookbehind: true,
        alias: "number",
    },
    constant: {
        pattern: /([^a-zA-Z0-9-_?$]|^|\s)(true|false)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
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
