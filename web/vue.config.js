// vue.config.js
module.exports = {
    // 选项...
    outputDir:'../server/public',
    devServer: {
        proxy: 'http://localhost:3000'
    }
}