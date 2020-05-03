/**
 * This file is main config of all automation as assist manager all package use to build this project more easily and organise also to make it easy to maintain 
 * The first line give instruction to export the configuration
 * The second line direct to the first instruction that need to be consider to run this project by webpack
 */
const path = require('path')
 module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        /**
         * The above and the bellow instruction control name and location of the main.js and name and folder
         */
        filename: 'ktbin-bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}