export function useSplitMenu() {
  return [
    {
      path: '/home',
      name: '首页',
      icon: 'material-symbols:bar-chart',
      children: [
        {
          path: '/home/ww',
          name: '第一',
          icon: 'material-symbols:bar-chart',
          children: [
            {
              path: '/home/ww/e',
              name: '耳热'
            }
          ]
        },
        {
          path: '/home/qq',
          name: '第二'
        }
      ]
    },
    {
      path: '/page/aa',
      name: 'haha',
      icon: 'mdi:about-circle-outline',
      children: [
        {
          path: '/page/dd',
          name: 'dadad'
        }
      ]
    },
    {
      path: '/about',
      name: '关于',
      icon: 'simple-icons:aboutdotme'
    }
  ]
}
