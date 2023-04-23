// webpack.dev.js
const path = require('path');

module.exports = {
    devtool: 'source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        allowedHosts: 'all',
        static: path.join(__dirname, 'devDist'), // 服务器资源的根目录，不写的话，默认为bundle.js
        hot: true, // 启用热加载
        host: '0.0.0.0', //
        port: 8003, // 端口号
        open: true, // 服务器启动后打开默认浏览器
        historyApiFallback: true, // 解决history模式刷新404
        proxy: [
            {
                context: ['/eoap'],
                changeOrigin: true,
                secure: false,
            },
            // {
            //     context: ['/api', '/service', '/command', 'operationCheck'],
            //     changeOrigin: true,
            //     secure: false,
            // },
        ],
        // '/eoap': {
        //     target: 'http://XXXXX:8080',
        //     changeOrigin: true,
        //     secure: false,
        // },
    },
    // mode: "development",
};
