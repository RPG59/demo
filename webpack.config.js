const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/main.ts',
	output: {
		filename: 'bundle.js',
		publicPath: '/dist/',
		path: path.resolve('dist'),
	},
	module: {
		rules: [
			{
				test: /\.ts/,
				loader: 'babel-loader',
			},
			{
				test: /\.glsl/,
				use: [{ loader: 'raw-loader' }],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.html'],
	},
	devServer: {
		contentBase: __dirname,
		compress: false,
		port: 6969,
	},
};
