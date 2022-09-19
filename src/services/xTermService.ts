import { api } from '@/consts/envs'
import WebSocketSafe from '@/library/wss'
import type { Terminal } from 'xterm'

// const utf8 = new TextDecoder('utf-8')

type TerminalAuthorization = unknown

// const terminalReceivers = {
//   write (this: XTermSession, data: { data: ArrayBuffer, type: 'Buffer' }) {
//     if (this.xTerm) {
//       this.xTerm.write(new Uint8Array(data.data))
//     }
//   }
// } as Receivers<XTermSession>

class XTermSession extends WebSocketSafe {
  xTerm: Terminal
  constructor (xTerm: Terminal, data?: TerminalAuthorization) {
    super(new URL(`wss://${api.host}/terminal`))

    this.xTerm = xTerm

    this.onopen = () => {
      if (data) {
        this.connect(data)
      }
    }
  }

  connect (data: TerminalAuthorization) {
    this.action('connect', data)
  }

  line (data: string) {
    this.action('line', data)
  }

  key (data: string) {
    this.action('key', data)
  }
}

type XTermAuthorization = {
  username: string
  host: string
  port: number
  password: string
}

export default {
  newXTermSession (xTerm: Terminal, data?: XTermAuthorization): XTermSession {
    return new XTermSession(xTerm, data)
  }
}