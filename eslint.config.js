import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
    js.configs.recommended,
    {
        plugins: {
            '@stylistic': stylistic,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.serviceworker,
            },
        },
        rules: {
            'no-unused-vars': [ 'warn', { args: 'none' } ],
            'no-use-before-define': [ 'error', { functions: false } ],
            'prefer-const': [ 'warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
            'no-invalid-this': 'error',
            '@stylistic/no-extra-semi': 'warn',
            '@stylistic/semi': [ 'warn', 'always', { omitLastInOneLineBlock: true } ],
            '@stylistic/comma-dangle': [ 'warn', 'always-multiline' ],
            '@stylistic/quotes': [ 'warn', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
        },
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
        },
    },
];
