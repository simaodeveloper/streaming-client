const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sass = require('sass');

const isProduction = () => process.env.NODE_ENV.toLowerCase() === 'production';

const ASSETS_PATH = 'assets';
const ROOT_PAGE_PATH = '.';
const OUTPUT_PATH = isProduction() ? '../server/public' : 'dist';

const config = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, OUTPUT_PATH),
    filename: `${ASSETS_PATH}/scripts/[name].[hash:8].js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `${ASSETS_PATH}/images/[name].[hash:8].[ext]`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: `${ROOT_PAGE_PATH}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: `${ASSETS_PATH}/styles/[name].[hash:8].css`,
    }),
  ],
};

if (isProduction()) {
  config.optimization = {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin(),
    ],
  };
}

module.exports = config;
