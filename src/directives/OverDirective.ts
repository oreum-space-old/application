import type { Directive, DirectiveBinding } from 'vue'

type T = HTMLElement
type V = boolean | undefined
type B = DirectiveBinding<V>
type D = Directive<T, V>
type M = Map<T, Over>
type A = Set<Over>
type E = Map<HTMLElement, Record<string, (() => void) | null>>

class Over {
  private static readonly storage: M = new Map()
  private static readonly handling: A = new Set()

  private readonly target: T
  private readonly setValue?: (v: boolean) => void
  private readonly elements: E

  private static documentPointerDown (event: PointerEvent): void {
    const target = event.target as HTMLElement | undefined
    for (const over of Over.handling) {
      console.log(over)

      if (!target || !over.elements.get(target)) {
        if (over.visible) {
          over.hide()
        }
      }
    }
  }

  protected static addHandle (over: Over): void {
    this.handling.add(over)

    if (this.handling.size === 1) {
      document.addEventListener('pointerdown', this.documentPointerDown)
    }
  }

  protected static removeHandle (over: Over): void {
    Over.handling.delete(over)

    if (this.handling.size === 0) {
      document.removeEventListener('pointerdown', this.documentPointerDown)
    }
  }

  private static addOver (target: T, binding: B): void {
    this.storage.set(target, new Over(target, binding))

    console.log(this.storage)
  }

  private static delOver (target: T): void {
    this.storage.delete(target)
  }

  public static mounted (this: undefined, target: T, binding: B): void {
    console.groupCollapsed('mounted', target.id)
    console.dir(target)
    console.log(binding)
    console.groupEnd()
    Over.addOver(target, binding)
  }

  public static unmounted (this: undefined, target: T, binding: B): void {
    console.groupCollapsed('unmounted', target.id)
    console.dir(target)
    console.log(binding)
    console.groupEnd()
    Over.delOver(target)
  }

  public static beforeUpdate (this: undefined, target: T, binding: B): void {
    console.groupCollapsed('beforeUpdate', target.id)
    console.dir(target)
    console.log(binding)
    console.groupEnd()
    const over = Over.storage.get(target)

    if (over) {
      over.visible = !!binding.value
    }
  }

  private static readonly actions = [
    'toggle',
    'hide',
    'show',
    'hover',
    'blur',
    'over'
  ] as Array<string>

  protected static getElement = {
    'target': (target: T): HTMLElement | null => {
      return target || null
    },
    'parent': (target: T): HTMLElement | null => {
      return target.parentElement || null
    },
    'last': (target: T): HTMLElement | null => {
      const parent = target.parentElement
      if (!parent || !parent.children || !parent.children.length) {
        return null
      }
      return parent.lastElementChild as HTMLElement || null
    },
    'first': (target: T): HTMLElement | null => {
      const parent = target.parentElement
      if (!parent || !parent.children || !parent.children.length) {
        return null
      }
      return parent.firstElementChild as HTMLElement || null
    },
    'next': (target: T): HTMLElement | null => {
      return target.nextElementSibling as HTMLElement || null
    },
    'prev': (target: T): HTMLElement | null => {
      return target.previousSibling as HTMLElement || null
    }
  } as Record<string, ((target: T) => HTMLElement | null) | undefined>

  protected static getElementKeys = Object.keys(this.getElement)

  protected static collectModifiers(target: T, binding: B): E {
    const _result = new Map()
    const result: Record<string, Record<string, (() => void) | null>> = {}

    for (const modifier in binding.modifiers) {
      const [element, action] = modifier.split('-')

      if (Over.getElementKeys.includes(element) && Over.actions.includes(action)) {
        const key = `vOver${element[0].toUpperCase()}${element.slice(1)}`
        if (!target.dataset[key]) {
          result[element] = {}
          result[element][action] = null
          target.dataset[key] = action
        } else {
          result[element][action] = null
          target.dataset[key] += `-${action}`
        }
      } else {
        console.warn('[v-over] unknown modifier:', modifier)
      }
    }

    for (const key in result) {
      const getElement = this.getElement[key]

      if (getElement) {
        const element = getElement(target)

        if (element) {
          _result.set(element, result[key])
        }
      }
    }

    return _result
  }

  constructor (target: T, binding: B) {
    this.target = target
    if (binding.arg) {
      this.setValue = binding.arg as unknown as (v: boolean) => void
    }

    this.elements = Over.collectModifiers(target, binding)

    this.addEventListeners()
    this.setVisible(binding.value)
  }

  protected static readonly eventListeners = {
    toggleHandler: (over: Over) => () => {
      over.toggle()
    },
    closeHandler: (over: Over) => () => {
      over.hide()
    },
    showHandler: (over: Over) => () => {
      over.show()
    }
  }

  addEventListeners (): void {
    console.log('addEventListeners', this.elements)
    for (const entries of this.elements) {
      const [target, actions] = entries

      for (const action in actions) {
        if (action === 'toggle') {
          target.addEventListener('click', (actions[action] = Over.eventListeners.toggleHandler(this)))
        } else if (action === 'hide') {
          target.addEventListener('click', (actions[action] = Over.eventListeners.closeHandler(this)))
        } else if (action === 'show') {
          target.addEventListener('click', (actions[action] = Over.eventListeners.showHandler(this)))
        } else if (action === 'hover') {
          target.addEventListener('pointerenter', (
            actions[action + '-pointerenter'] =
              Over.eventListeners.showHandler(this)
          ))
          target.addEventListener('pointerout', (
            actions[action + '-pointerout'] =
              Over.eventListeners.closeHandler(this)
          ))
        } else if (action === 'blur') {
          target.addEventListener('pointerenter', (actions[action] = Over.eventListeners.closeHandler(this)))
        } else if (action === 'over') {
          target.addEventListener('pointerout', (actions[action] = Over.eventListeners.showHandler(this)))
        }
      }
    }
  }

  removeEventListeners (): void {
    console.log('TODO:')
  }

  toggle (): void {
    this.visible = !this.visible
  }

  show (): void {
    if (this.visible) {
      return
    }
    this.visible = true
  }

  hide (): void {
    if (!this.visible) {
      return
    }
    this.visible = false
  }

  get visible (): boolean {
    return !!this.target.dataset['vOverState']
  }

  set visible (value) {
    if (value !== this.visible) {
      this.setVisible(value)
    }
  }

  private setVisible (value: V) {
    this.target.dataset['vOverState'] = value ? 'true' : ''
    this.target.style.display = value ? '' : 'none'

    value
      ? Over.addHandle(this)
      : Over.removeHandle(this)

    if (this.setValue) {
      this.setValue(!!value)
    }
  }
}

export default {
  mounted: Over.mounted,
  unmounted: Over.unmounted,
  beforeUpdate: Over.beforeUpdate
} as D