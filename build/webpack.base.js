// webpack.base.js
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// const AutoImport = require('unplugin-auto-import/webpack');
// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const isDev = process.env.NODE_ENV === 'development';
const baseConfig = {
    // 入口
    entry: '/src/main.js',

    // devtool: isDev ? 'source-map' : 'hidden-source-map',
    module: {
        // loader
        rules: [
            {
                test: /.(s[ac]ss|css)$/i,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /.(jpg|png|gif)$/,
                type: 'asset',
                // 解析
                parser: {
                    // 转base64的条件
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于 10kb 文件转为base64地址 减少请求
                    },
                },
                generator: {
                    // 与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: 'img/[name]-[hash:6].[ext]',
                    // 打包后对资源的引入，文件命名已经有/img了
                    publicPath: './',
                },
            },
            {
                test: /.js$/,
                use: ['babel-loader?cacheDirectory=true'], // 开启babel缓存，第二次构建时，会读取之前的缓存
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_ENV: JSON.stringify(process.env.API_ENV),
            },
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'src/assets/image/favicon.ico',
        }),
        // new FriendlyErrorsWebpackPlugin({
        //   compilationSuccessInfo: {
        //     messages: [`Application is running here: http://localhost:9000`],
        //   },
        // }),
        // 进度条
        new ProgressBarPlugin({
            format: `:msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        }),
        // AutoImport({
        //   resolvers: [
        //     ElementPlusResolver({
        //       exclude: new RegExp(/^(?!.*loading-directive).*$/),
        //     }),
        //   ],
        // }),
        // Components({
        //   resolvers: [ElementPlusResolver()],
        // }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 引入文件时,默认js,json不用写扩展名,但是当引入例如jsx文件时默认是不可以不写后缀名的,如果不想写后缀名在这里进行配置
        alias: {
            '@': path.resolve(__dirname, '../src'), // 因为此时我们在build目录下 所以src相对于当前文件的外层
        },
    },
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
};

module.exports = isDev
    ? merge(baseConfig, devConfig)
    : merge(baseConfig, prodConfig);
