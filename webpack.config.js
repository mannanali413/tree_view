const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
		filename: "app.css",
});

const config = {
	devtool: 'eval',
	entry: {
	 app: './src/index.js',
	 vendor: [
		"react",
		"react-dom",
		"react-router",
		"redux",
		"react-redux",
		"redux-promise",
		"redux-actions",
		"velocity-react",
		"shallowequal",
		"deep-equal",
		"superagent"
	 ]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js|.jsx$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
					}, {
						loader: "sass-loader",
						options: {
							includePaths: ["sass"]
						}
					}]
				}),
				exclude: '/node_modules/'
			}
		]
	},
	plugins: [
		extractSass,
		new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
		// new webpack.optimize.UglifyJsPlugin({ mangle: false, compress: { warnings: false }}),
	],
	resolve: {
		modules: [ 'node_modules' ],
		extensions: [ '.js', '.jsx']
	},
	target: 'web'
};

module.exports = config;
