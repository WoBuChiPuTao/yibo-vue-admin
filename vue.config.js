const path = require('path')

const { defineConfig } = require('@vue/cli-service')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const Icons = require('unplugin-icons/webpack')
// const IconsResolver = require('unplugin-icons/resolver')

// 生产环境配置
const externals = []
// if (process.env.NODE_ENV === 'production') {
//   console.log('production')
//   // 生产环境排除mock文件夹
//   //  \u4e00 === &
//   externals.push(/^\u4e00\//)
//   externals.push({
//     mock: 'mock'
//   })
// }
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: {
      app: './src/main.ts'
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js'
    },
    externals: externals,
    plugins: [
      // Icons({
      //   compiler: 'vue3',
      //   autoInstall: true,
      //   tsx: 'react'
      // }),
      // require('unplugin-vue-components/webpack')({
      //   dts: 'types/components.d.ts',
      //   resolvers: [
      //     // 自动导入图标组件
      //     IconsResolver({
      //       // 图标使用：<{prefix}-{collection}-{icon} />
      //       prefix: 'icon'
      //     })
      //   ]
      // })
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
  devServer: {
    port: '1315',
    proxy: {
      '/api': {
        target: 'http://101.35.249.181/api',
        pathRewrite: { '^/api': '' },
        ws: true, // 用于支持websocket
        changeOrigin: true // 用于控制请求头中的host值
      }
    }
  },
  chainWebpack: (config) => {
    // 路径别称
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('#', resolve('types'))
    config.resolve.alias.set('&', resolve('mock'))
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
  },
  pluginOptions: {
    // electron builder 配置
    electronBuilder: {
      nodeIntegration: true,
      // 设置应用主进程的入口
      mainProcessFile: 'src/background.ts',
      // 设置应用渲染进程的入口
      rendererProcessFile: 'src/main.ts',
      customFileProtocol: 'admin://./',
      // externals: ['admin'],
      chainWebpackMainProcess: (config) => {
        // 路径别称
        config.resolve.alias.set('@', resolve('src'))
        config.resolve.alias.set('#', resolve('types'))
        config.resolve.alias.set('&', resolve('mock'))
      },
      builderOptions: {
        appId: 'com.yibo.admin', // 软件id
        productName: 'YiboAdmin', // 打包后的名称
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: './public/favicon.ico',
          extendInfo: {
            LSUIElement: 0
          },
          target: [
            {
              target: 'dmg',
              arch: ['x64', 'arm64']
            }
          ],
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: 'PicGo-${version}-${arch}.dmg'
        },
        win: {
          icon: './public/logo.jpg',
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: 'YiboAdmin-Setup-${version}-${arch}.exe',
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32']
            }
          ]
        },
        nsis: {
          // 如果为false，想要给电脑所有用户安装必须使用管理员权限
          allowElevation: true,
          // 是否一键安装
          oneClick: false,
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true,
          guid: 'com.yibo.admin', // 软件id
          shortcutName: 'YiboAdmin',
          include: './build/electron/installer.nsh'
        },
        linux: {
          icon: 'build/icons/'
        }
      }
    }
  }
})
