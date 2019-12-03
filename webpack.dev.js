const resolve = require('path').resolve;

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    externals: {
        config: JSON.stringify({})
    },
    devServer: {
        contentBase: [resolve('dist'), resolve('public')],
        compress: true,
        port: 9008,
        historyApiFallback: {
            rewrites: [
                { from: /^\/js\/emulator\.js$/, to: '/emulator.js' },
                { from: /^\/.*/, to: '/index.html' }
            ]
        }
    }
};