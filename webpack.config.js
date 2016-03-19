var path = require('path');
var webpack = require('webpack');

module.exports = {

	context: path.resolve(__dirname, 'src/'),

	entry: {
		interface: './interface',
	},

	output: {
		path: path.resolve(__dirname, 'static/dist'),
		filename: '[name].js',
		chunkFilename: '[id]-[hash].chunk.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			}
		]
	},

  plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

	devServer: {
    publicPath: '/dist',

		headers: {
			'Access-Control-Allow-Origin': '*'
		},

    stats: {
      colors: true
    },

    noInfo: true,
	}
};
