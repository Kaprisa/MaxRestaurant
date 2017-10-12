const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const pug = require('./webpack/pug');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'public/assets'),
    build: path.join(__dirname, 'public/dist')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/js/index.js',
            'about': PATHS.source + '/js/about.js',
            'menu': PATHS.source + '/js/menu.js',
            'article': PATHS.source + '/js/article.js',
            'reservation': PATHS.source + '/js/reservation.js',
            'gallery': PATHS.source + '/js/gallery.js',
            'shop': PATHS.source + '/js/shop.js',
            'product': PATHS.source + '/js/product.js',
            'cart': PATHS.source + '/js/cart.js',
            'checkout': PATHS.source + '/js/checkout.js',
            'account': PATHS.source + '/js/account.js',
            'blog': PATHS.source + '/js/blog.js',
            'contacts': PATHS.source + '/js/contacts.js',
            'admin': PATHS.source + '/js/admin.js',
            'error': PATHS.source + '/js/error.js'
        },
        output: {
            path: PATHS.build,
            filename: 'js/[name].js'
        },
        devtool: 'cheap-eval-source-map',
        plugins: [
            new CleanWebpackPlugin(['public/dist']),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/index.pug'),
                chunks: ['index', 'common'],
                filename: 'index.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/about.pug'),
                chunks: ['about', 'common'],
                filename: 'about.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/menu.pug'),
                chunks: ['menu', 'common'],
                filename: 'menu.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/blog.pug'),
                chunks: ['blog', 'common2'],
                filename: 'blog.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/reservation.pug'),
                chunks: ['reservation', 'common'],
                filename: 'reservation.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/article.pug'),
                chunks: ['article', 'common2'],
                filename: 'article.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/gallery.pug'),
                chunks: ['gallery', 'common'],
                filename: 'gallery.html'
            }),
             new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/product.pug'),
                chunks: ['product', 'common2'],
                filename: 'product.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/shop.pug'),
                chunks: ['shop', 'common2'],
                filename: 'shop.html'
            }),
             new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/cart.pug'),
                chunks: ['cart', 'common2'],
                filename: 'cart.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/checkout.pug'),
                chunks: ['checkout', 'common2'],
                filename: 'checkout.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/account.pug'),
                chunks: ['account', 'common2'],
                filename: 'account.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/contacts.pug'),
                chunks: ['contacts', 'common'],
                filename: 'contacts.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/error.pug'),
                chunks: ['error'],
                filename: 'error.html'
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'views/admin.pug'),
                chunks: ['admin'],
                filename: 'admin.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                chunks: ['index', 'menu', 'about', 'reservation', 'gallery', 'contacts']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common2',
                chunks: ['blog', 'article', 'shop', 'product', 'cart', 'checkout', 'account']
            })
        ],
    },
    pug(),
    images(),
    fonts()
]);


module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCss(),
            uglifyJs()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
};