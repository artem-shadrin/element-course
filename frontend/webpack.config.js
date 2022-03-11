const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, {mode}) => {

  const isDev = mode === 'development'

  return {
    mode: mode,
    entry: './app/app.js',
    output: {
      path: path.join(__dirname, 'assets'),
      filename: "bundle.js"
    },
    devServer: {
      hot: true,
      open: true,
      port: 3000,
      watchFiles: "frontend/app/*.html"
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      })
    ]
  };
}