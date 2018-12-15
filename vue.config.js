const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const modifyVars = require('./src/utils/vant.css.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  lintOnSave: false,

  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'index',
  outputDir: 'static',

  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '11000',
    https: false,
    proxy: {
      '/api': {
        target: 'http://xgjw.ambcon.cn/index.php/studentweb/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    },
  },
  productionSourceMap: false,

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      },
      less: {
        modifyVars,
      }
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.css$/,
          threshold: 5120,
          deleteOriginalAssets: false,
          algorithm: 'gzip'
        })]
      }
    }
  }
}
