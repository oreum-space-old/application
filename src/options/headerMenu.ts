function WIP () { alert('Work in progress!') }

export default [
  {
    text: 'Главная',
    icon: 'home',
    to: { name: 'Home' }
  },
  {
    text: 'Серверы',
    icon: 'servers',
    items: [
      {
        text: '-',
        action: WIP
      }
    ]
  },
  {
    text: 'Правила',
    icon: 'rules',
    action: WIP
  },
  {
    text: 'Тест',
    icon: 'test',
    action: WIP
  },
  {
    text: 'Форум',
    icon: 'forum',
    action: WIP
  },
  {
    text: '',
    icon: 'develop',
    items: [
      {
        text: 'Welcome',
        icon: 'user-interface',
        to: { name: 'Welcome' }
      },
      {
        text: 'Панель управления',
        icon: 'dashboard',
        to: { name: 'Dashboard' }
      },
      {
        text: 'Консоль',
        icon: 'console',
        to: { name: 'Dashboard Terminal' }
      },
      {
        text: 'User Interface',
        icon: 'user-interface',
        to: { name: 'User Interfaces' }
      }
    ],
    arrowHidden: true
  }
] as const