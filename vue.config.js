const { defineConfig } = require('@vue/cli-service')
const Icons = require('unplugin-icons/webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  }
})
