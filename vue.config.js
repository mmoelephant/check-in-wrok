const test = 'http://testc.dlzjzy.com'
module.exports = {
    // 选项...
    publicPath:process.env.NODE_ENV === 'development'?'':'/',
    outputDir:'dist',
    assetsDir:'',
    indexPath:'index.html',
    productionSourceMap: false,
    lintOnSave: true,
    devServer: {// 环境配置
        host: 'localhost',
        port: 1234,
        https: false,
        hotOnly: false,
        open: false, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: test + '/index.php',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    },
    chainWebpack: config => {
        config.module
        .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
                .loader('px2rem-loader')
                .options({
                    remUnit: 75
                })
    },
    // configureWebpack: config => {
    //     require('vux-loader').merge(config, {
    //         options: {},
    //         plugins: ['vux-ui']
    //     })
    // },
}