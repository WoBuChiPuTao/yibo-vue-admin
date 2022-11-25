export function useSplitMenu() {
  return [
    {
      path: '/home',
      name: '首页',
      children: [
        {
          path: '/home/ww',
          name: '第一',
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
      children: [
        {
          path: '/page/dd',
          name: 'dadad'
        }
      ]
    },
    {
      path: '/about',
      name: '关于'
    }
  ]
}
