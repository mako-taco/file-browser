const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index",
  target: "web",
  devtool: "source-map",
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist")
  }
};
