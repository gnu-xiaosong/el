const path = require("path");
module.exports = {
    mode: "production",
    entry: "./dist/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "el.min.js",
        libraryTarget: "umd"
    }
};