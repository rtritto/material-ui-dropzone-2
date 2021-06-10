module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				loose: true,
				modules: false
			}
		],
		'@babel/preset-react'
	],
	plugins: [
		'babel-plugin-optimize-clsx',
		[
			'@babel/plugin-proposal-class-properties',
			{
				loose: true
			}
		],
		[
			'@babel/plugin-proposal-object-rest-spread',
			{
				loose: true
			}
		],
		'@babel/plugin-transform-runtime',
		// for IE 11 support
		'@babel/plugin-transform-object-assign',
		// material-ui 'productionPlugins'
		'@babel/plugin-transform-react-constant-elements',
		'babel-plugin-transform-dev-warning',
		[
			'babel-plugin-transform-react-remove-prop-types',
			{
				mode: 'unsafe-wrap'
			}
		]
		// END material-ui 'productionPlugins'
	],
	ignore: [/@babel[\\|/]runtime/] // Fix a Windows issue.
}