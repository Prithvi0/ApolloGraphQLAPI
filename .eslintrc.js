module.exports = {
    'env': {
        'browser': true,
        'es2020': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'rules': {
        // only single quotes
        'quotes': ['error', 'single'],
        // force semicolons
        'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
        // use 4 spaces to indent code
        'indent': ['error', 4],
        // avoid useless spaces
        'no-multi-spaces': ['error']
    }
};
