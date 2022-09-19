/* eslint-disable no-control-regex */
import WebSocketSafe from '@/library/wss'
import { api } from '@/consts/envs'
import { reactive } from 'vue'

/* const utf8 = new TextDecoder('utf-8') */

/* const COLORS = {
  '30': 'var(--terminal-b)',
  '40': 'var(--terminal-b)',
  '91': 'var(--ANSI-red)',
  '101': 'var(--ANSI-red-b)',
  '92': 'var(--ANSI-green)',
  '102': 'var(--ANSI-green-b)',
  '93': 'var(--ANSI-yellow)',
  '103': 'var(--ANSI-yellow-b)',
  '94': 'var(--ANSI-blue)',
  '104': 'var(--ANSI-blue-b)',
  '95': 'var(--ANSI-magenta)',
  '105': 'var(--ANSI-magenta-b)',
  '96': 'var(--ANSI-cyan)',
  '106': 'var(--ANSI-cyan-b)',
  '37': 'var(--ANSI-gray)',
  '47': 'var(--ANSI-gray-b)',
  '90': 'var(--ANSI-dark-gray)',
  '100': 'var(--ANSI-dark-gray-b)',
  '31': 'var(--ANSI-dark-red)',
  '41': 'var(--ANSI-dark-red-b)',
  '32': 'var(--ANSI-dark-green)',
  '42': 'var(--ANSI-dark-green-b)',
  '33': 'var(--ANSI-dark-yellow)',
  '43': 'var(--ANSI-dark-yellow-b)',
  '34': 'var(--ANSI-dark-blue)',
  '44': 'var(--ANSI-dark-blue-b)',
  '35': 'var(--ANSI-dark-magenta)',
  '45': 'var(--ANSI-dark-magenta-b)',
  '36': 'var(--ANSI-dark-cyan)',
  '46': 'var(--ANSI-dark-cyan-b)',
  '97': 'var(--ANSI-white)',
  '107': 'var(--ANSI-white-b)'
} as Record<string, string | undefined> */

type ANSI = {
  id: number,
  text: string,
  color?: string,
  background?: string
  textDecoration?: string
  cursor?: boolean
}

/* let id = 0 */

/* function oneEscape (state: State, prev: ANSI, string: string): ANSI {
  const result = { ...prev }
  let cut = 0
  let match: RegExpMatchArray | null = null

  if (string.startsWith('\x1b[')) {
    if (string.match(/>>/)) {
      string = ''
    }
    else if (string.match(/\x1b\[\dJ/)) {
      cut = 4
      state.console = []
      console.clear()
    }
    else if ((match = string.match(/\x1b\[\d*K/g))) {
      if (state.console.length && !state.console[state.console.length - 1].text.includes('')) {
        state.console.length -= 1
      }
      cut = match[0].length
    }
    else if ((match = string.match(/\x1b\[\d*X/g))) {
      cut = match[0].length
    }
    else if ((match = string.match(/^\x1b\[38;2;\d+;\d+;\d+m/))) {
      cut = match[0].length
      if ((match = match[0].slice(7, -1).split(';'))) {
        result.color = `rgb(${match[0] || 0}, ${match[1] || 0}, ${match[2] || 0})`
      }
    }
    else if ((match = string.match(/^\x1b\[48;2;\d+;\d+;\d+m/))) {
      cut = match[0].length
      if ((match = match[0].slice(7, -1).split(';'))) {
        result.background = `rgb(${match[0] || 0}, ${match[1] || 0}, ${match[2] || 0})`
      }
    }
    else if ((match = string.match(/^\x1b\[([3-4]|9)[0-7]m/)) || (match = string.match(/^\x1b\[10[0-7]m/))) {
      const type = ['3', '9'].includes(match[0].slice(2, 3)) ? 'color' : 'background'
      const color = match[0].slice(2, -1)
      cut = match[0].length

      result[type] = COLORS[color]
    }
    else if (string.startsWith('\x1b[0m')) {
      cut = 4
      result.color = undefined
      result.background = undefined
    } else if (string.startsWith('\x1b[m')) {
      cut = 3
      result.color = undefined
      result.background = undefined
    }
    else if (string.startsWith('\x1B[H')) {
      state.console = []
      console.clear()
      cut = 3
    }
    else if ((match = string.match(/\x1b\[((\d*)|(\d*;\d*))H/))) {
      cut = match[0].length
      console.log(match)
      if (match[0].slice(-3) === ';1H') {
        string += '\n'
      }
    }
    else if (string.startsWith('\x1B[?25l')) {
      cut = 6
    } else if (string.startsWith('\x1b[?25')) {
      cut = string.startsWith('\x1b[?25l') ? 5 : 6
    } else if (string.startsWith('\x1b[25l')) {
      cut = 5
    } else if (string.startsWith('\x1b[39m') || string.startsWith('\x1b[38m')) {
      cut = 5
      result.color = undefined
    } else if (string.startsWith('\x1b[49m') || string.startsWith('\x1b[48m')) {
      cut = 5
      result.background = undefined
    }
    else if ((match = string.match(/\x1b\[\d+([xyut])/))) {
      cut = match[0].length
    }
  }
  result.text = string.slice(cut)
  return result
} */

/* let current: ANSI = {
  id: id++,
  text: '',
  color: undefined,
  background: undefined,
  textDecoration: undefined
} */

/* function escapeParser (state: State, buffer: Uint8Array): void {
  const parts: Array<string> = []
  const string = utf8.decode(buffer)
  let pointer = 0
  let index = buffer.indexOf(0x1b, pointer)
  console.log('req:', [string])

  while (index !== -1) {
    pointer = index
    index = string.indexOf('\x1b', index + 1)
    parts.push(
      string.slice(pointer, index)
        .replaceAll('\r\n', '\n')
        .replace(/Loading personal and system profiles took \d+ms./, '')
    )
  }
  // console.log([string])
  // console.log(parts)
  console.group()
  for (const part of parts) {
    // console.log(part)
    current = oneEscape(state, current, part)
    console.log([part, current.text, current])
    if (current.text) {
      if (current.text.match(/\n/)?.length || 0 > 1) {
        for (const p of current.text.split(/(?=\n})/g)) {
          if (p) {
            state.console.push({ ...current, id: id++, text: p })
          }
        }
      } else {
        state.console.push(current)
      }
    }
  }
  console.groupEnd()
} */

// const terminalReceivers = {
//   write (this: TerminalSession, data: { data: ArrayBuffer, type: 'Buffer' }) {
//     escapeParser(this.state, new Uint8Array(data.data))
//   }
// } as Receivers<TerminalSession>

type TerminalAuthorization = {
  username: string
  host: string
  port: number
  password: string
}

type State = {
  status: 'created' | 'opened' | 'closed' | 'failed'
  console: Array<ANSI>
}

class TerminalSession extends WebSocketSafe {
  state = reactive<State>({
    status: 'created',
    console: []
  })
  constructor (data?: TerminalAuthorization) {
    super(new URL(`wss://${api.host}/terminal`))

    this.onopen = () => {
      // console.log('onopen', event)
      this.state.status = 'opened'
      if (data) {
        this.connect(data)
      }
    } /*
    this.onclose = async (event) => {
      console.log('onclose', event)
      if (this.state.status !== 'failed') {
        this.state.status = 'closed'
      }
    }
    this.onerror = (event) => {
      event.preventDefault()
      console.log('onerror', event)
      this.state.status = 'failed'
    }
    this.onmessage = (event) => {
      console.log('onmessage', event)
    } */
  }

  connect (data: TerminalAuthorization) {
    this.action('connect', data)
  }

  line (data: string) {
    this.action('line', data)
  }
}

export default {
  newTerminalSession (data?: TerminalAuthorization): TerminalSession {
    return new TerminalSession(data)
  }
}