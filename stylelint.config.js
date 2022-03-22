module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-rational-order',
        'stylelint-config-prettier'
    ],
    plugins: ['stylelint-order'],
    rules: {
        'declaration-block-trailing-semicolon': null,
        indentation: 4
    },
    externals: {
        AMap: 'AMap',
        AMapUI: 'AMapUI'
    }
}
