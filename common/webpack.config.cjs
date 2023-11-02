const path = require("path");

exports.default = {
    entry: {
        prism: "./src/scripts/prism.ts",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    mode: "production",
    output: {
        path: path.resolve(__dirname, "lib"),
        clean: true,
    },
};
