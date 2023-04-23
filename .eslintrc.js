module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['prettier'],
    parser: 'vue-eslint-parser',
    rules: {
        'arrow-parens': 0,
        'vue/multi-word-component-names': 0,
        'comma-dangle': 'off',
        'generator-star-spacing': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'always'],
        'space-before-function-paren': 0,
        'eol-last': 0,
        'no-useless-escape': 'off',
        'max-len': [
            2,
            1000,
            4,
            {
                ignoreUrls: true,
            },
        ],
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false,
            },
        ],
        'guard-for-in': 'error',
        indent: [
            'warn',
            4,
            // 强制统一缩进
        ],
        parser: 0,
    },
    extends: ['plugin:vue/vue3-essential', '@vue/standard'],
    // extends: [
    //   'plugin:vue/vue3-essential', //
    //   'eslint:recommended',
    //   '@vue/prettier',
    // ],
};
