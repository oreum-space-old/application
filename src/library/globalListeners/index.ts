const SPACE_ATTRIBUTES = {
  role: ['checkbox', 'button']
} as Readonly<Record<string, Array<unknown>>>

const ARROW_ATTRIBUTES = {
  role: ['radiogroup', 'button']
}

function findByAttribute (
  path: Array<Element | Document | Window>,
  attributes: Readonly<Record<string, Array<unknown>>>
): Element | Document | Window | undefined {
  return path.find(element => {
    if (!(element instanceof Window) && !(element instanceof Document)) {
      for (const attribute in attributes) {
        if (attributes[attribute].includes(element.getAttribute(attribute))) {
          return true
        }
      }
    }
    return false
  })
}

function arrowFinder (event: KeyboardEvent, path: Array<Element | Document | Window>): void {
  if (event.code.startsWith('Arrow') && findByAttribute(path, ARROW_ATTRIBUTES)) {
    event.preventDefault()
  }
}

const FINDERS = {
  Space (event, path) {
    if (findByAttribute(path, SPACE_ATTRIBUTES)) {
      event.preventDefault()
    }
  },
} as Readonly<Record<string, { (event: KeyboardEvent, path: Array<Element | Document | Window>): void }>>

export default function () {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    const path = event.composedPath() as Array<Element | Document | Window>

    if (FINDERS[event.code]) {
      FINDERS[event.code](event, path)
    }
    arrowFinder(event, path)
  })
}