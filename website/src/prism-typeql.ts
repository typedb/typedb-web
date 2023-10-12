import Prism from "prismjs";

export function installPrismTypeQL() {
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
                /(?:\s)(sub!?|isa!?|as|has|owns|abstract|relates|plays|match|regex|iid|label|define|undefine|insert|delete|aggregate|where|asc|desc|when|then|fetch|like|floor|ceil|round|abs|or|not)(?=\s|$|;)/,
        },
        unreservedKeyword: {
            pattern:
                /(?<=;\s*|^\s*)(value|min|max|median|mean|std|sum|count|get|sort|limit|offset|group|contains|rule)(?=\s|$|;)/,
            lookbehind: true,
            alias: "keyword",
        },
        annotation: {
            pattern: /((?:(?![-a-zA-Z_0-9]|\$).)|^|\s)(@key|@unique|@card)(?![-a-zA-Z_0-9])/,
            lookbehind: true,
        },
        type: {
            pattern: /((?:(?![-a-zA-Z_0-9]|\$).)|^|\s)(entity|relation|attribute|thing)(?![-a-zA-Z_0-9])/,
            lookbehind: true,
        },
        modifier: {
            pattern: /((?:(?![-a-zA-Z_0-9]|\$).)|^|\s)(boolean|double|long|string|datetime)(?![-a-zA-Z_0-9])/,
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
            pattern: /[0-9]+(\.-[0-9][0-9]*)?/,
            alias: "number",
        },
        operator: {
            pattern: /=|;|\.|\+|\*|\/|\^|,|\(|\)|:|{|}|[|]|!=|>|<|>=|<=/,
            alias: "operator",
        },
    };
}
