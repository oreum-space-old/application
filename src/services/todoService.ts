import http from '@/library/http'
import type Url from '@/types/url'

export default {
  getTodo (id: number) {
    const url: Url = `https://jsonplaceholder.typicode.com/todos/${id}`

    return http.get(url)
  }
}
