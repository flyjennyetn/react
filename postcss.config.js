module.exports = {
    parser: 'postcss-scss',
    plugins: {
        'precss': {},
        'autoprefixer': {},
        'postcss-flexbugs-fixes': {},
        'postcss-pxtorem': {
            rootValue: 75,
            propWhiteList: [],
        }
    }
}