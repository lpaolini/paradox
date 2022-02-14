const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: "static"
            }]
        })
    ],
    mode: 'production',
    target: 'web',
    entry: './src/alarm.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}
