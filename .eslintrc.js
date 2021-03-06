module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'parser': '@typescript-eslint/parser',
	'plugins': [
		'@typescript-eslint'
	],
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': 'off',
		'@typescript-eslint/indent': ["error", 2],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single', { avoidEscape: true }
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error'
		]
	}
};