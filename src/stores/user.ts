import { addRoutes } from '@/router'
import dashboard from '@/routes/dashboard'
import { defineStore } from 'pinia'

type State = {
  id: number
  username: string
}

const useUser = defineStore('user', {
  state: (): State => ({
    id: NaN,
    username: ''
  }),
  actions: {
    initRoutes () {
      if (this.username === 'Oredan') {
        addRoutes(dashboard)
      }
    }
  }
})

export default useUser
