export function useSplitMenu() {
  return [
    {
      path: '/home',
<<<<<<< HEAD
      name: '首页',
      icon: '',
=======
      name: '首页AAAA',
>>>>>>> 55dbfaf492b31d614904b4766737f95daa50310f
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
      icon: '',
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
      icon: ''
    }
  ]
}
