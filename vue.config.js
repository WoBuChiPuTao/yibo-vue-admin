const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/var/index.less')]
    }
  },
  configureWebpack: {
    plugins: [
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        tsx: 'react'
      }),
      require('unplugin-vue-components/webpack')({
        dts: 'types/components.d.ts',
        resolvers: [
          // 自动导入图标组件
          IconsResolver({
            // 图标使用：<{prefix}-{collection}-{icon} />
            prefix: 'icon'
          })
        ]
      })
    ]
  },
  chainWebpack: (config) => {
    // vue-i18n配置
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    // svg-sprite-loader配置
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
