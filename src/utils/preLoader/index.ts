/* eslint-disable @typescript-eslint/no-unused-vars */
function importAllSvgIcons() {
  try {
    const request: __WebpackModuleApi.RequireContext = require.context(
      '../../assets/svg',
      false,
      /\.svg$/
    )
    request.keys().forEach((key) => request(key))
  } catch (err) {
    console.error(err)
  }
}

function imporAllImg() {
  try {
    const request: __WebpackModuleApi.RequireContext = require.context(
      '@/assets/img',
      false,
      /\.*$/
    )
    const promiseList: Promise<string>[] = []
    request.keys().forEach((url) => promiseList.push(imgPreloader(request(url))))
    return Promise.all(promiseList)
  } catch (err) {
    console.error(err)
  }
}

// 创建单个图片加载的方法-包成一个promise
const imgPreloader = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve('图片加载成功')
    }
    image.onerror = () => {
      reject(new Error('图片加载出错'))
    }
    image.src = url
  })
}

export async function preLoader() {
  importAllSvgIcons()
  try {
    await imporAllImg()
  } catch (error) {
    console.error(error)
  }
}
