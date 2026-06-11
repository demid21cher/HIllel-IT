const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      main: './src/index.ts',
      vendor: './src/vendor.js',
    },
    output: {
      filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    mode: argv.mode || 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist',
      port: 3000,
      hot: true,
      liveReload: true,
      open: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? 'css/[name].[contenthash].css'
          : 'css/[name].css',
      }),
      new ESLintPlugin({
        extensions: ['js', 'ts'],
        exclude: 'node_modules',
        overrideConfig: {
          env: {
            browser: true,
            node: true,
            es2021: true,
          },
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint'],
          extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
          ],
          rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'no-console': 'off',
          },
        },
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: isProduction ? 'server' : 'disabled',
        openAnalyzer: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                api: 'modern',
              },
            },
          ],
        },
        {
          test: /\.less$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]',
          },
        },
      ],
    },
  };
};
