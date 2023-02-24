export function importAllSvgIcons() {
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
