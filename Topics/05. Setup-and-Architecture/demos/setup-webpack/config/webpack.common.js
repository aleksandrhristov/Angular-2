var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': './polyfills.ts',
		'vendor': './vendor.ts',
		'app': './main.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		loaders: [{
			test: /\.ts$/,
			loaders: [
				'awesome-typescript-loader',
				'angular2-template-loader'
			]
		}, {
			test: /\.html$/,
			loader: 'html-loader'
		}, {
			test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			loader: 'file?name=assets/[name].[hash].[ext]'
		}, {
			test: /\.css$/,
			exclude: helpers.root('src', 'app'),
			loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
		}, {
			test: /\.css$/,
			include: helpers.root('src', 'app'),
			loader: 'raw-loader'
		}]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};