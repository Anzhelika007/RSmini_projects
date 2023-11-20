const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? false : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/sass/style.scss'],
        devServer: {
            static: './dist',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'index_bundle.js',
            assetModuleFilename: 'assets/[name][ext][query]',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ]
                }, {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: "index.html",
                inject: "body",
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new FaviconsWebpackPlugin('./src/img/icons/favicon.png'),
            new CopyPlugin({
                patterns: [
                    { from: "./src/img/", to: "assets/[name][ext][query]" },
                ],
                options: {
                    concurrency: 100,
                },
            }),
        ],
        devServer: {
            static: path.join(__dirname, 'dist'),
            port: 5000,
            open: true,
        },
        stats: {
            children: true,
        },
    }
    return config;
};