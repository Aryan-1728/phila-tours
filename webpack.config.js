const currentTask = process.env.npm_lifecycle_event;

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");
const postCSSPluggins = [
  require("postcss-import"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
  require("postcss-mixins"),
];

class TaskAfterCompilation {
  apply(compiler) {
    compiler.hooks.done.tap("Copy Images", function () {
      fse.copySync("./app/assets/images", "./dist/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    {
      loader: "css-loader",
      options: {
        url: false,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: postCSSPluggins,
        },
      },
    },
  ],
};

let config = {
  entry: "./app/assets/scripts/app.js",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./app/index.html",
    }),
  ],
  module: {
    rules: [cssConfig],
  },
};

if (currentTask === "dev") {
  config.output = {
    filename: "app.bundled.js", //create a filename where the output should be seen , the webpack on its own creates a dist folder with main.js as default . In main.js is where the default file is saved
    path: path.resolve(__dirname, "app"), //we use const path in order to not write the complete path rather __dirname , directs the path to the current directory
  };

  config.devServer = {
    watchFiles: {
      paths: ["./app/**/*.html"], //to only accept the files with extension .html and only wtach them not all the files
      options: {
        ignore: "./app/assets/*", //ignore all the files in the assets folder
      }
    },
    static: {
      directory: path.join(__dirname, "app"),
      watch: false, // for automated updation like the one that happens in react , it is false to keep the defaut watcher off
    },
    hot: "only",
    port: 3000,
  };
  cssConfig.use.unshift("style-loader");
  config.mode = "development"; //u need to mention if it is in development mode or production mode
  // for automated updation like the one that happens in react
}

if (currentTask === "build") {
  config.output = {
    // filename: "app.bundled.js",//create a filename where the output should be seen , the webpack on its own creates a dist folder with main.js as default . In main.js is where the default file is saved
    filename: "[name][chunkhash].js",
    chunkFilename: "[name][chunkhash].js",
    path: path.resolve(__dirname, "dist"), //we use const path in order to not write the complete path rather __dirname , directs the path to the current directory
  };
  config.optimization = {
    splitChunks: {
      chunks: "all",
    },
  };
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[chunkhash].css",
    }),
    new TaskAfterCompilation()
);

  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPluggins.push(require("cssnano"));
  config.mode = "production";
}
module.exports = config;
