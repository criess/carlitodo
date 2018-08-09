const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GIT_VERSION = require('./getGitVersion')();

const reactLoader = { // load jsx and js files with babel
    test: /\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    'env', {
                        targets: {
                            browserlist: "last 2 versions"
                        },
                    },
                ],
                'react',
                'stage-2',
            ],
        },
    },
    include: [
        path.join(__dirname, '../app/assets/javascripts'),
    ],
};

module.exports = function (environment = "development") {

    const longEnvironment = {
      "prod": "production",
      "dev": "development",
      "st": "staging",
    }[environment] || environment;


    let webpackPublicPath = '/assets/';

    const config = {
        entry: {
            bundle: ['babel-polyfill', 'application'],
        },

        output: {
            path: path.join(__dirname, '../app/assets/javascripts/'),
            publicPath: webpackPublicPath,
            chunkFilename: '[name].js',
            filename: '[name].js',
            library:  'carlitodo',
        },

        resolve: {
            modules: [
                path.join(__dirname, '../app/assets/javascripts/'),
                "node_modules/"
            ],
        },

        module: {
            rules: [
                reactLoader,
            ]
        },

        plugins: [
            new CommonsChunkPlugin({
                name: "common",
                filename: "[name].js",
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(longEnvironment),
                GIT_VERSION: JSON.stringify(GIT_VERSION),
            }),

            // only load locals of moment js we define here
            // as momentjs loads its locals dynamicly, webpack will load all locals which increase file-size
            // this way we can prevent it, see: https://github.com/moment/moment/issues/1435#issuecomment-33106268
            new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(de)$/),
            new ExtractTextPlugin({ filename: '[name].css', disable: true }), // disabled here, as we need it in cssExport only!
        ],
    };

    if ( environment == "production" || environment == "prod" ) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    preamble: "/*\nBUNDLED\n" + GIT_VERSION + "*/",
                },
            })
        );
    }

    return config;
}

