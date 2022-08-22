function WIP () { alert('Work in progress!') }

export default [
  {
    text: 'Главная',
    icon: 'home',
    to: { name: 'Home' }
  },
  {
    text: 'Серверы',
    icon: 'server',
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
        to: { name: 'Welcome' }
      },
      {
        text: 'Консоль',
        icon: 'console',
        to: { name: 'Welcome' }
      },
      {
        text: 'User Interface',
        icon: 'user-interface',
        to: { name: 'User Interfaces' }
      }
    ]
  }
] as const