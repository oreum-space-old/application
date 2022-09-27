import type Url from '@/types/url'

export default {
  apiUrl: import.meta.env.API_URL as Url
} as const