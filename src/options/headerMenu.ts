// function WIP () { alert('Work in progress!') }

export default [
  {
    text: 'page-home',
    icon: 'home',
    to: { name: 'Home' }
  },
  {
    text: '',
    icon: 'develop',
    items: [
      {
        text: 'page-welcome',
        icon: 'pinned-page',
        to: { name: 'Welcome' }
      },
      {
        text: 'page-control-panel',
        icon: 'dashboard',
        to: { name: 'Dashboard' }
      },
      {
        text: 'page-console',
        icon: 'console',
        to: { name: 'Dashboard Terminal' }
      },
      {
        text: 'page-user-interface',
        icon: 'pinned-page',
        to: { name: 'User Interfaces' }
      }
    ],
    arrowHidden: true
  }
] as const