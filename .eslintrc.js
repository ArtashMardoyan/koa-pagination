module.exports = {
    plugins: ['prettier'],
    extends: ['standard', 'prettier'],
    env: { es6: true, node: true, jest: true },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true, experimentalObjectRestSpread: true }
    },
    rules: {
        'prettier/prettier': [
            'error',
            { tabWidth: 4, printWidth: 130, singleQuote: true, trailingComma: 'none', arrowParens: 'avoid' }
        ]
    }
};
