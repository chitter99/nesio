const resolve = require('path').resolve;
const merge = require('webpack-merge');

module.exports = (env) => {
    return merge({
		entry: resolve('src'),
		output: {
			path: resolve('dist'),
			filename: 'emulator.js'
		},
		module: {
			rules: [{
				test: /\.tsx?$/,
				use: [
					'ts-loader'
				]
			}]
		},
		resolve: {
			extensions: ['.js', '.ts'],
			descriptionFiles: ['package.json'],
			modules: [
				resolve('node_modules'),
				'node_modules'
			]
		}
	}, require('./webpack.' + env + '.js'));
} 