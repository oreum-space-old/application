export type Receivers<T> = Record<string, (this: T, data: unknown) => void>

export default class WebSocketSafe extends WebSocket {
  protected receivers: Receivers<any> = {}

  constructor (url: URL) {
    super(url)
    this.onmessage = this._onmessage
  }

  _onmessage (event: MessageEvent) {
    const { action, data } = JSON.parse(event.data)
    const receiver = this.receivers[action]

    if (action === 'ping') {
      this.action('pong')
    }
    if (action === 'pong') {
      this.action('ping')
    }
    if (action === 'warn') {
      console.warn('WebSocket', this.url, event)
    }
    if (action === 'error') {
      console.error('WebSocket', this.url, event)
    }

    if (receiver) {
      receiver.call(this, data)
    } else {
      // console.warn('Receiver with action', action, 'is not found!')
    }
  }

  action (action: string, data?: unknown): void {
    this.send(JSON.stringify({ action, data }))
  }
}