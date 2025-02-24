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
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(define|undefine|redefine|match|with|fun|struct|return|reduce|get|select|assert|insert|delete|update|put|std|median|mean|max|min|first|sum|count|group|where|limit|offset|sort|asc|desc|when|then|fetch|rule|like|floor|ceil|round|abs)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    constraint: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(as|sub!|sub|has|has!|owns|relates|links|links!|plays|value|isa!|isa|contains|iid|is|or|try|not)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    annotation: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(@values|@abstract|@regex|@key|@unique|@card|@distinct|@independent|@cascade|@debug|@replace)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    type: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(entity|relation|attribute|thing)(?![-a-zA-Z_0-9])/,
        lookbehind: true,
    },
    modifier: {
        pattern: /((?:(?![-a-zA-Z_0-9]|\$|\?).)|^|\s)(boolean|double|long|int|string|datetime)(?![-a-zA-Z_0-9])/,
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
    object_label: {
        pattern: /<[^>]+>/,
        alias: "grammar",
    },
    operator: {
        pattern: /=|;|\.|\+|\*|\/|\^|,|\(|\)|:|{|}|\[|]|!=|>|<|>=|<=|->|\?/,
        alias: "operator",
    },
    spaced_operator: {
        pattern: / (-) /,
        alias: "operator",
    }
};
