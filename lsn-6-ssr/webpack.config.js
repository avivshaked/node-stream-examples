const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./lsn-6-ssr/src/index.html",
  filename: "./index.html"
});

const mainConfig = {

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
};

const webConfig = {...mainConfig,
  entry: './lsn-6-ssr/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [htmlPlugin],
  target: 'web',
};

const serverConfig = {...mainConfig,
  entry: './lsn-6-ssr/src/server.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js'
  },
  target: 'node',
  externals: [nodeExternals()],
};

module.exports = [webConfig, serverConfig];
