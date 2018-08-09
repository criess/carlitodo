const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const scssLoader = function(environment) {

 var minimizerOptions = {};

 if ( environment == "production" ) {
    minimizerOptions.minimize = true;
 } else {
    minimizerOptions.minimize = false;
 }

 return { // load scss files from imports and render it to _css filder
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: minimizerOptions,
                },{
                    loader : 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: (loader) => [
                            autoprefixer({ flexbox: false }),
                        ]
                    }
                },{
                    loader : 'sass-loader',
                    options: {
                        sourceComments: true,
                        includePaths: [
                            path.join(__dirname, '../app/assets/stylesheets'),
                        ],
                    }
                }
            ]
        }),
        include: [path.join(__dirname, '../app/assets/stylesheets'), '/tmp'],
    };
}

const fontLoader = { // load static assets like fonts, png, and resolve path ...
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    use: 'file-loader?name=[name].[ext]&publicPath=/assets/',
    include: [path.join(__dirname, '../app/assets/fonts')],
};

const imageLoader = { // load static assets like fonts, png, and resolve path ...
    test: /\.(jpe?g|jpg|gif|png|svg)$/,
    use: 'file-loader?name=[name].[ext]&publicPath=/assets/',
    include: [path.join(__dirname, '../app/assets/images')],
};

module.exports = function (environment = "development") {
    return {
        entry: { // define multiple entry points for css fils if you like multiple css files
            bundle: path.join(__dirname, '../app/assets/stylesheets/application.scss'),
        },

        output: {
            path: path.join(__dirname, '../app/assets/stylesheets'),
            filename: '[name].css',
        },

        resolve: {
            modules: [
                path.resolve(path.join(__dirname, '../app/assets/stylesheets/')),
                "node_modules/"
            ],
            alias: {
                Fonts: path.join(__dirname, '../app/assets/fonts/')
            },
        },

        module: {
            rules: [
                scssLoader(environment),
                fontLoader,
                imageLoader,
            ]
        },

        // extract css styles in seperate files per chunk
        // see more: https://webpack.github.io/docs/stylesheets.html
        plugins: [
            new ExtractTextPlugin('[name].css')
        ],
    };
}

