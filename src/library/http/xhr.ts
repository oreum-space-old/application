import { api } from '@/consts/envs'
import type { Method } from '@/library/http'
import XhrPromise from '@/library/http/xhrPromise'
import type Url from '@/types/url'
import type { LocationQueryRaw } from 'vue-router'
import query from '@/library/query'

type RequestHeader = { name: string, value: string }

type RequestHeaders = Array<RequestHeader>

type XhrOptions = {
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  requestHeaders?: RequestHeaders
  withCredentials?: boolean
}

const _JSON = 'json'

export default class Xhr<Body, Response = unknown> extends XMLHttpRequest {
  readonly _options?: XhrOptions
  readonly query?: string
  readonly url: Url
  readonly method: Method
  private body?: Body

  constructor (method: Method, url: Url, body?: Body, queryObject?: LocationQueryRaw, options?: XhrOptions) {
    super()
    queryObject && (this.query = query.stringify(queryObject))
    body && (this.body = body)
    options && (this._options = options)
    this.method = method
    this.url = this.query ? `${url}?${this.query}` : url
    this.create(this.method, this.url, this._options)
  }

  resend (body?: Body, promise?: XhrPromise<Body, Response>): XhrPromise<Body, Response> {
    if (body) {
      this.body = body
    }
    this.open(this.method, this.url)
    return promise || new XhrPromise(this)
  }

  send (): XhrPromise<Body, Response> {
    return new XhrPromise(this)
  }

  create (method: Method, url: Url, options?: XhrOptions) {
    this.open(method, url)

    this.responseType = options?.responseType || _JSON

    if (this.responseType === _JSON) {
      this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    }

    if (options) {
      const { timeout, requestHeaders, withCredentials } = options
      timeout !== undefined && (this.timeout = timeout)
      requestHeaders?.length && this.setRequestHeaders(requestHeaders)
      withCredentials && (this.withCredentials = true)
    }

    if (url.startsWith(api)) {
      this.withCredentials = true
      const token = localStorage.getItem('access')
      if (token) {
        this.setRequestHeader('Authorization', `Bearer ${ token }`)
      }
    }
  }

  setRequestHeaders (headers: RequestHeaders): void {
    for (const header of headers) {
      this.setRequestHeader(header.name, header.value)
    }
  }

  request (): void {
    super.send(JSON.stringify(this.body))
  }
}
