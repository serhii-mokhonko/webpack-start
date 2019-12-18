const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "production",
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: "assets/js/[name].bundle.js",
        publicPath: ''
    },
    devServer: {
        overlay: true,
        port: 8080,
        compress: true,
        open: true
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            // html
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            //images
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/images/[name].[ext]',
                        }
                    }
                ]
            },
            // fonts
            {
                test: /\.(otf|eot|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader'
                },
            },
            // less
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    "css-loader",
                    'postcss-loader',
                    "less-loader"
                ]
            },
            // css
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name]-[hash:8].css",
            ignoreOrder: false
        })
    ]
}