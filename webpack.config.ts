import * as webpack from "webpack";
import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config: webpack.Configuration = {
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
        }),
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        }]
    },
};

export default config;
