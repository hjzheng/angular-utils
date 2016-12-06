var path = require('path');

module.exports = function (config) {
	config.set({
		frameworks: ['jasmine-ajax', 'jasmine'],
		files: [
			'./test/spec.index.js',
			'./test/src.index.js'
		],
		preprocessors: {
			'./test/spec.index.js': ['webpack'],
			'./test/src.index.js': ['webpack', 'coverage']
		},
		webpack: {
			devtool: 'eval',
			output: {
				pathinfo: true
			},
			eslint: {
				configFile: '.eslintrc',
				emitWarning: true,
				emitError: true,
				formatter: require('eslint-friendly-formatter')
			},
			module: {
				preLoaders: [{
					test: /\.js$/,
					loader: 'eslint-loader',
					exclude: /node_modules/,
					include: [path.join(__dirname, './src')]
				}],
				loaders: [{
					test: /\.js$/,
					loaders: ['babel'],
					exclude: /node_modules/,
					include: [path.join(__dirname, './src'), path.join(__dirname, './test')]
				}],
				postLoaders: [{
					test: /\.js$/,
					loader: 'istanbul-instrumenter',
					exclude: /node_modules/,
					include: [path.join(__dirname, './src')]
				}]
			}

		},
		// Webpack middleware
		webpackMiddleware: {
			noInfo: true
		},

		browsers: ['PhantomJS'],
		// browsers: ['Chrome'],
		browserify: {
			debug: true,
			bundleDelay: 2000 // Fixes "reload" error messages, YMMV!
		},
		reporters: ['progress', 'coverage'],
		// optionally, configure the reporter
		coverageReporter: {
			reporters: [
				// generates ./coverage/lcov.info
				{type: 'lcovonly', subdir: '.'},
				// generates ./coverage/coverage-final.json
				{type: 'json', subdir: '.'}
			]
		},
		singleRun: true,
		concurrency: Infinity
	});
};
