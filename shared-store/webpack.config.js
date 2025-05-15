const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/store.ts',
  mode: 'development',
  devServer: {
    port: 3003,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/**/*'],
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'sharedstore',
      filename: 'remoteEntry.js',
      exposes: {
        './store': './src/store',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'react-redux': { singleton: true },
        '@reduxjs/toolkit': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: "<div id='root'></div>",
    }),
  ],
};