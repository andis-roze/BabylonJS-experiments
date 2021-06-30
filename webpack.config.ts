import * as webpack from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

interface Configuration extends webpack.Configuration {
    devServer?: WebpackDevServerConfiguration;
  }

const config: Configuration = {
    name: "BabylonJS-playground",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    entry: {
        app: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "BabylonJS playground",
            template: "./src/index.html",
            filename: "./index.html",
            inject: false,
            minify: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets", to: "./assets/" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
    }
};

export default config;
