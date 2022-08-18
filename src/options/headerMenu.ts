function WIP () { alert('Work in progress!') }

export default [
  {
    text: 'Главная',
    icon: 'home',
    to: { name: 'Home' }
  },
  {
    text: 'Серверы',
    items: [
      {
        text: '-',
        action: WIP
      }
    ]
  },
  {
    text: 'Правила',
    action: WIP
  },
  {
    text: 'Форум',
    action: WIP
  },
  {
    text: 'Разработка',
    icon: 'develop',
    items: [
      {
        text: 'Welcome',
        icon: 'user-interface',
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