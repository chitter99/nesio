const resolve = require('path').resolve;

module.exports = {
    mode: 'production',
    output: {
        path: resolve('public/js'),
        filename: 'emulator.js'
    },
    externals: {
        config: JSON.stringify({})
    }
};