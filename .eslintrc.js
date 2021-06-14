module.exports = {
	extends: [
		//
		'react-app',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: ['@babel/preset-react']
		}
	},
	rules: {
		// note you must disable the base rule as it can report incorrect errors
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error']
	}
}
