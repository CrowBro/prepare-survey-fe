import { resolve } from "path";
import * as webpack from "webpack";
import * as HtmlWebPackPlugin from "html-webpack-plugin";

export default {
    mode: "development",
    context: __dirname,
    entry: "./src/index.tsx",
    stats: "none",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        modules: ["node_modules", "./src"],
        extensions: [".js", ".ts", ".tsx", ".css",]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [ 
                    /node_modules/,
                ],
                loaders: [
                    "ts-loader?configFile=tsconfig.webpack.json",
                    "eslint-loader",
                ]
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: resolve(__dirname, "dist"),
        historyApiFallback: true,
        watchContentBase: true,
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: true
        },
        port: 10001,
        proxy: {
            "/api": {
                changeOrigin: true,
                target: "http://localhost:3000"
            }
        },
    },
    devtool: "source-map"
};
