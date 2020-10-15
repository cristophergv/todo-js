const HtmlWebPackPlugin             = require('html-webpack-plugin');
const MiniCssExtractPlugin          = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin       = require('optimize-css-assets-webpack-plugin');
const CopyPlugin                    = require('copy-webpack-plugin');
const TerserPlugin                  = require('terser-webpack-plugin');
const { CleanWebpackPlugin }        = require('clean-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ]
        }),
        
    ],
    output: {
        filename: 'main.[chunkhash].js'
    },
}
