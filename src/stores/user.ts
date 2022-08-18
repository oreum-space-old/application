import { defineStore } from 'pinia'

type State = {
  id: number
  username: string
}

const useUser = defineStore('user', {
  state: (): State => ({
    id: 0,
    username: 'Oredan'
  }),
  actions: {
  }
})

export default useUser
