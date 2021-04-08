module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/extensions': ['.ts', '.tsx'],
    },
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:import/react',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    ignorePatterns: ['node_modules/', 'react-pages/', 'webpack.config.js'],
    rules: {
        /**
         * Prettier Rules
         */
        'prettier/prettier': 'error',

        /**
         * Javascript Rules
         */
        // possible errors
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-await-in-loop': 'error',
        'no-dupe-else-if': 'error',
        'no-import-assign': 'error',
        // best practices
        'block-scoped-var': 'error',
        'default-case': 'error',
        'default-param-last': 'error',
        eqeqeq: 'error',
        'no-alert': 'error',
        'no-empty-function': 'error',
        'no-extra-bind': 'error',
        'no-multi-spaces': 'error',
        'no-return-await': 'error',
        'no-useless-call': 'error',
        'no-useless-concat': 'error',
        'no-useless-return': 'error',
        'require-await': 'error',
        'dot-notation': 'error',
        'guard-for-in': 'error',
        'no-else-return': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-implicit-coercion': 'error',
        'no-implied-eval': 'error',
        'no-lone-blocks': 'error',
        'no-param-reassign': 'error',
        'no-proto': 'error',
        'no-sequences': 'error',
        yoda: 'error',
        // variables
        'no-undef-init': 'error',
        'no-use-before-define': 'error',
        // stylistic issues
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        camelcase: 'error',
        'comma-spacing': ['error', { before: false, after: true }],
        'consistent-this': ['error', 'self'],
        'func-call-spacing': ['error', 'never'],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'no-inline-comments': 'error',
        'no-lonely-if': 'error',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'error',
        'prefer-object-spread': 'error',
        'space-before-blocks': 'error',
        // ES6
        'arrow-spacing': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-rename': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': ['error', { object: true, array: false }],
        'prefer-template': 'error',
        'rest-spread-spacing': 'error',
        'template-curly-spacing': 'error',
        'prefer-spread': 'error',
        'prefer-rest-params': 'error',
        'no-useless-computed-key': 'error',

        /**
         * React Rules
         */
        'react/prop-types': 'off',

        /**
         * Import Rules
         */

        'import/order': [
            'error',
            { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] },
        ],
        'import/no-absolute-path': 'error',
        'import/no-dynamic-require': 'error',
        'import/no-self-import': 'error',
        'import/no-useless-path-segments': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
        'import/no-unassigned-import': ['error', { allow: ['*/**/*.css', '*/**/*.scss'] }],
    },
};
