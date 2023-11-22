const path = require('path')
const CheckUpdatePluhgin = require('vue-check-update-plugin')
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  transpileDependencies: true,
  filenameHashing: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()

    config.module.rule('ts').test(/\.ts$/).use('ts-loader').loader('ts-loader').end()

    if (!isDev) {
      config.externals({ vue: 'Vue', vuex: 'Vuex', axios: 'axios', 'vue-router': 'VueRouter' })
      config.plugin('html').tap(args => {
        args[0].cdn = { js: ['vue', 'vuex', 'axios', 'vue-router'].map(lib => `/cdn/js/${lib}.min.js`), css: [] }
        return args
      })
    }
  },
  configureWebpack: config => {
    config.entry = './src/main.ts'
    config.resolve = {
      extensions: ['.ts', '.js', '.vue'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js')
      }
    }

    !isDev &&
      config.plugins.push(
        new CheckUpdatePluhgin({
          name: 'vue2-starter-template',
          version: '1.0.0',
          content: ['替换cdn']
        })
      )
  },

  devServer: {
    port: 8080,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_BASE_TARGET,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_URL]: ''
        }
      }
    }
  }
}
