/**
 * This file is main config of all automation as assist manager all package use to build this project more easily and organise also to make it easy to maintain 
 * The first line give instruction to export the configuration
 * The second line direct to the first instruction that need to be consider to run this project by webpack
 */
const path = require('path')
const katbinPCssPlgins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        /**
         * The above and the bellow instruction control name and location of the main.js and name and folder
         */
        filename: 'ktbin-bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        before: function(app, server){
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host:'0.0.0.0'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', {loader: 'postcss-loader', options:{plugins: katbinPCssPlgins}}]
            }
        ]
    }
}