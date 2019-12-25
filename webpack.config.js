const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractCSS = require("extract-text-webpack-plugin");

const ENTRY_FILE = path.resolve(__dirname, "src", "js", "index.js");
const OUTPUT_DIR = path.join(__dirname, "dist");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractCSS.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugin() {
                  return [autoprefixer({ browsers: "cover 99.5%" })];
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images"
          }
        }
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images"
        }
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "js/index.js"
  },
  plugins: [
    new HtmlPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new ExtractCSS({
      filename: "./css/style.css"
    })
  ]
};

module.exports = config;
