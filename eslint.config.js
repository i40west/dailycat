import js from '@eslint/js';
// import tseslint from 'typescript-eslint';
import globals from 'globals';
import stylisticPlugin from '@stylistic/eslint-plugin';
// import tsparser from '@typescript-eslint/parser';

export default [
	js.configs.recommended,
	// ...tseslint.configs.recommended.map(config => ({
	// 	...config,
	// 	files: ['**/*.ts'],
	// 	languageOptions: {
	// 		parser: tsparser,
	// 	},
	// })),
	{
		files: ['**/*.{js,ts}'],
		plugins: {
			'@stylistic': stylisticPlugin,
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.nodeBuiltin,
				...globals.serviceworker,
			},
		},
		rules: {
			'no-unused-vars': [ 'warn', { args: 'none' } ],
			'no-use-before-define': [ 'error', { functions: false } ],
			'prefer-const': [ 'warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
			'no-invalid-this': 'error',
			'no-shadow': 'warn',
			'@stylistic/no-extra-semi': 'warn',
			'@stylistic/semi': [ 'warn', 'always', { omitLastInOneLineBlock: true } ],
			'@stylistic/comma-dangle': [ 'warn', 'always-multiline' ],
			'@stylistic/quotes': [ 'warn', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
			'@stylistic/jsx-quotes': [ 'warn', 'prefer-double' ],
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
	},
	// {
	// 	files: ['**/*.ts'],
	// 	rules: {
	// 		'@typescript-eslint/ban-ts-comment': 'off',
	// 		'@typescript-eslint/no-empty-object-type': 'off',
	// 		'@typescript-eslint/no-explicit-any': 'off',
	// 		'no-unused-vars': 'off',
	// 		'@typescript-eslint/no-unused-vars': [ 'warn', { args: 'none' } ],
	// 		'no-use-before-define': 'off',
	// 		'@typescript-eslint/no-use-before-define': [ 'error', { functions: false } ],
	// 		'no-shadow': 'off',
	// 		'@typescript-eslint/no-shadow': 'warn',
	// 		'@typescript-eslint/no-redundant-type-constituents': 'off',
	// 	},
	// },
];
