/**
 * This file is main config of all automation as assist manager all package use to build this project more easily and organise also to make it easy to maintain 
 * The first line give instruction to export the configuration
 * The second line direct to the first instruction that need to be consider to run this project by webpack
 */
const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const katbinMiniCssExtraPlgin = require('mini-css-extract-plugin')
const katbinHtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const katbinPCssPlgins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class RunAfterCompile{
    apply(compiler){
        compiler.hooks.done.tap('copy images', function(){
            fse.copySync('./app/assets/images', './docs/assets/images')
        })
    }
}

katbinCssConfig = {
    test: /\.css$/i,
    use: ['css-loader', {loader: 'postcss-loader', options:{plugins: katbinPCssPlgins}}]
}

let pages = fse.readdirSync('./app').filter(function(file){
    return file.endsWith('.html')
}).map(function(page){
    return new katbinHtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: pages,
    module: {
        rules: [
            katbinCssConfig
        ]
    }
}

if (currentTask == 'dev'){
    katbinCssConfig.use.unshif('style-loader')
    config.output= {
        /**
         * The above and the bellow instruction control name and location of the main.js and name and folder
         */
        filename: 'ktbin-bundled.js',
        path: path.resolve(__dirname, 'app')
    }

    config.devServer = {
        before: function(app, server){
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host:'0.0.0.0'
    }

    config.mode = 'development'
}

if (currentTask == 'build'){
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }     
        }
    })
    katbinCssConfig.use.unshift(katbinMiniCssExtraPlgin.loader)
    katbinPCssPlgins.push(require('cssnano'))
    config.output= {
        /**
         * The above and the bellow instruction control name and location of the main.js and name and folder
         */
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }

    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new katbinMiniCssExtraPlgin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
    )
}

module.exports = config
