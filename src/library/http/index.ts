import type XhrPromise from '@/library/http/xhrPromise'
import Xhr from '@/library/http/xhr'
import type Url from '@/types/url'
import type { LocationQueryRaw } from 'vue-router'

const http = {
  get<R> (url: Url, query?: LocationQueryRaw): XhrPromise<undefined, R> {
    return new Xhr<undefined, R>('get', url, undefined, query).send()
  },
  post<R, B = unknown> (url: Url, body: B, query?: LocationQueryRaw): XhrPromise<B, R> {
    return new Xhr<B, R>('post', url, body, query).send()
  },
  patch<R, B = unknown> (url: Url, body: B, query?: LocationQueryRaw): XhrPromise<B, R> {
    return new Xhr<B, R>('patch', url, body, query).send()
  },
  delete<R, B = unknown> (url: Url, body: B, query?: LocationQueryRaw): XhrPromise<B, R> {
    return new Xhr<B, R>('delete', url, body, query).send()
  }
}

export type Method = keyof typeof http

export default http
