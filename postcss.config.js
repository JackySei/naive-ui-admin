module.exports = {
  plugins: [
    [
      // postcss-preset-env插件读取package.json文件中的browserslist配置
      // 或者根目录新建一个 .browserslistrc 文件
      require('postcss-preset-env')(),
    ],
  ],
};
