const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  context: __dirname,
  entry: ["./src/js/ClientApp.jsx", "./src/scss/main.scss"],
  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  devServer: {
    publicPath: "/public/",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // define where to save the file
      filename: "style.css",
      allChunks: true
    })
  ]
};

if(process.env.NODE_ENV === 'production') {
  config.entry ='./src/js/App.jsx';
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
