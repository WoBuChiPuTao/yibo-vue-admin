import type { BrowserWindow } from 'electron'
import { nativeImage } from 'electron'

// 未知原因，按钮添加到菜单栏的缩图工具栏上不成功
export function setThumbarButtons(win: BrowserWindow) {
  let setSuccess = false
  win.on('show', () => {
    setSuccess = win.setThumbarButtons([
      {
        tooltip: 'button1',
        icon: nativeImage.createFromPath('/src/assets/img/logo.jpg'),
        click: function () {
          console.log('button2 clicked')
        }
      },
      {
        tooltip: 'button2',
        icon: nativeImage.createFromPath('/src/assets/img/logo.jpg'),
        flags: ['enabled', 'dismissonclick'],
        click: function () {
          console.log('button2 clicked.')
        }
      }
    ])
  })

  setInterval(() => console.log('setSuccess', setSuccess), 500)
}
