import http from '@/library/http'
import env from '@/env'

const { apiUrl } = env

type Tokens = {
  refresh: string,
  access: string
}

export default {
  refreshTokens (body: Tokens) {
    return http.post<string, Tokens>(`${apiUrl}/user/refresh`, body)
  }
}
