/* eslint-disable @typescript-eslint/no-unused-vars */
function importAllSvgIcons() {
  try {
    const request: __WebpackModuleApi.RequireContext = require.context(
      '../../assets/svg',
      false,
      /\.svg$/
    )
    request.keys().forEach(request)
  } catch (err) {
    console.log(err)
  }
}

function imporAllImg() {
  try {
    const request: __WebpackModuleApi.RequireContext = require.context(
      '../../../public/img',
      false,
      /\.*$/
    )
    const promiseList: Promise<string>[] = []
    console.log(request.keys())
    for (let i = 0; i < request.keys().length; i++) {
      promiseList.push(imgPreloader('./img/' + request.keys()[i].substring(2)))
    }
    return Promise.all(promiseList)
  } catch (err) {
    console.log(err)
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
  await imporAllImg()
}
