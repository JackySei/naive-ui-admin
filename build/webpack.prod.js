// webpack.prod.js

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 出口
    output: {
        filename: 'js/[name]-[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/ai',
        // 静态资源CDN
        // publicPath:
        publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[chunkhash].css',
            chunkFilename: 'css/[name]-[chunkhash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    // mode: process.env.NODE_ENV || "production",
};
