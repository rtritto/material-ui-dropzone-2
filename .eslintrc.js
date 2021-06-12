module.exports = {
	extends: [
		'react-app',
		'plugin:prettier/recommended'
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ["@babel/preset-react"]
		}
	}
}