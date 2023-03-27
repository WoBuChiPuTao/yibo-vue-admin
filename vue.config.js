const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
module.exports = defineConfig({
  transpileDependencies: true,
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
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(__dirname, './src/style/var/index.less')}";`
          }
        }
      }
    }
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
