module.exports = {
    root: true,
    env: {
        node: true
    },
    parser: 'vue-eslint-parser',
    // 优先级低于parse的语法解析配置
    parserOptions: {
        // 指定ESlint的解析器
        parser: '@typescript-eslint/parser',
        // 允许使用ES语法
        ecmaVersion: 2020,
        // 允许使用import
        sourceType: 'module',
        // 允许解析JSX
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended'
    ],
    plugins: ['vue'],
    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        // 是否允许对象中出现结尾逗号
        'comma-dangle': ['off', 'never'],
        // 使用 le t和 const 代替 var
        'no-var': 'warn',
        'no-undef': 'off',
        'no-async-promise-executor': 'off',
        // 代码缩进
        indent: ['off', 4],
        'no-mixed-spaces-and-tabs': 2,
        quotes: [2, 'single'],
        // 必须使用全等
        eqeqeq: 1,
        //指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'never'],
        // if while function 后面的{必须与if在同一行，java风格。
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        // 控制逗号前后的空格
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        // 控制逗号在行尾出现还是在行首出现 (默认行尾)
        'comma-style': [2, 'last'],
        // 文件末尾强制换行,always允许换行,never不允许换行
        'eol-last': [2, 'always'],
        'array-bracket-newline': [0, 'never'],
        // 不允许以分号结尾, never 不要分号  always要分号
        semi: [2, 'never'],
        // 可以使用any类型
        '@typescript-eslint/no-explicit-any': 0,
        // 可以使用空方法
        '@typescript-eslint/no-empty-function': 0,
        // 可以对this取别名
        '@typescript-eslint/no-this-alias': 0,
        'vue/multi-word-component-names': 0,
        // Object.assign的使用规范
        'prefer-object-spread': 'error',
        // 字符串拼接使用字符串模板
        'prefer-template': 'error',
        // 检查函数的返回值
        'array-callback-return': 'error',
        // 不允许重复声明变量
        'no-shadow': 'error'
    }
}
