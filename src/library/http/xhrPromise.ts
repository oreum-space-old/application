import type Xhr from '@/library/http/xhr'
import XhrReject from '@/library/http/xhrReject'

export default class XhrPromise<Body, Response = unknown> {
  private readonly xhr: Xhr<Body, Response>
  private readonly executor: (
    resolve: (value: (PromiseLike<Response> | Response)) => void,
    reject: (reason?: unknown) => void
  ) => void
  private promise: Promise<Response>

  constructor (xhr: Xhr<Body, Response>) {
    this.xhr = xhr
    this.executor = (resolve, reject) => {
      xhr.onload = function () {
        if (this.status === 297) {
          // Access token died
          // TODO: refreshTokens
          return reject(new XhrReject('script'))
        }
        if (this.status >= 400) {
          reject(xhr.response)
        }
        resolve(xhr.response)
      }
      xhr.onerror = () => reject(new XhrReject('script'))
      xhr.onabort = (event) => {
        event.preventDefault()
        reject(new XhrReject('abort'))
      }
      xhr.ontimeout = (event) => {
        event.preventDefault()
        reject(new XhrReject('timeout'))
      }
    }
    this.promise = new Promise<Response>(this.executor)
    this.xhr.request()
  }

  then (
    onFulfilled?: ((value: Response) => (Response | Promise<Response>)) | null | undefined,
    onRejected?: ((reason: unknown) => unknown | Promise<unknown>) | null | undefined
  ) {
    return this.promise.then(onFulfilled, onRejected)
  }

  catch (onRejected?: ((reason: unknown) => Promise<never>) | null | undefined) {
    return this.promise.catch(onRejected)
  }

  finally (onFinally?: (() => void) | null | undefined) {
    return this.promise.finally(onFinally)
  }

  public resend (body?: Body): XhrPromise<Body, Response> {
    this.xhr.resend(body, this)
    this.promise = new Promise<Response>(this.executor)
    this.xhr.request()
    return this
  }

  public cancel (): void {
    this.xhr.abort()
  }
}
