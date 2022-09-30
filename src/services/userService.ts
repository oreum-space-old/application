import http from '@/library/http'

type Tokens = {
  refresh: string,
  access: string
}

type ValidateUsernameRequestBody = {
  username: string
}

type ValidateUsernameResponse = {
  username: string,
  taken: boolean
}

type ValidateEmailRequestBody = {
  email: string
}

type ValidateEmailResponse = {
  email: string,
  taken: boolean
}

export default {
  refreshTokens (body: Tokens) {
    return http.post<string, Tokens>('/api/user/refresh', body)
  },
  validateUsername (username: string) {
    return http.post<ValidateUsernameResponse, ValidateUsernameRequestBody>('/api/user/validate/username', { username })
  },
  validateEmail (email: string) {
    return http.post<ValidateEmailResponse, ValidateEmailRequestBody>('/api/user/validate/email', { email })
  }
}
