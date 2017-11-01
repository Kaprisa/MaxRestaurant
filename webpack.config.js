const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
//const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

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
            //devserver(),
            sass(),
            css()
        ])
    }
};