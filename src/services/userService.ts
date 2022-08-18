import http from '@/library/http'
import { api } from '@/consts/envs'

type Tokens = {
  refresh: string,
  access: string
}

export default {
  refreshTokens (body: Tokens) {
    return http.post<string, Tokens>(`${api}/user/refresh`, body)
  }
}
