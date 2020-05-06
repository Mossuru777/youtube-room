const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/assets",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "source-map-loader",
            options: {
              enforce: "pre",
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts", ".jsx", ".json"],
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "static"),
  },
};
