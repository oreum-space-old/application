import type { Directive, DirectiveBinding } from 'vue'

type OverDirectiveValue = boolean | undefined

const handling: Array<HTMLElement> = []

function scrollHandler (event: Event) {
  console.log('scrollHandler', event)
}

function pointerdownHandler (event: Event) {
  console.log('pointerdownHandler', event)
}

function addHandling (el: HTMLElement): void {
  if (!handling.includes(el)) {
    const rect = el.getClientRects()[0]

    if (rect) {
      handling.push(el)
    }
  }

  if (handling.length === 1) {
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('pointerdown', pointerdownHandler)
  }
}

function removeHandling (el: HTMLElement): void {
  const index = handling.indexOf(el)

  if (index !== -1) {
    handling[index] = handling[handling.length - 1]
    handling.pop()
  }

  if (handling.length === 0) {
    window.removeEventListener('scroll', scrollHandler)
    window.addEventListener('pointerdown', pointerdownHandler)
  }
}

function elPointerdownHandler (event: PointerEvent) {
  event.stopPropagation()
}

function determineValue (el: HTMLElement, bindings: DirectiveBinding<OverDirectiveValue>): boolean {

  if (bindings.modifiers.parent) {
    const parent = el.parentElement

    if (parent && parent.dataset['vOverOpenState']) {
      return parent.dataset['vOverOpenState'] === 'true'
    }
  }

  if (bindings.value !== undefined) {
    return bindings.value
  }
  // TODO: Добавить необходимые модификаторы, если они будут необходимы в проекте:
  // if (bindings.modifiers.prev) {
  //
  // }
  // if (bindings.modifiers.next) {
  //
  // }
  return false
}

function registerTargetHandler (el: HTMLElement, bindings: DirectiveBinding<OverDirectiveValue>) {
  if (bindings.modifiers.parent) {
    const parent = el.parentElement
  }
}

function unregisterTargetHandler (el: HTMLElement, bindings: DirectiveBinding<OverDirectiveValue>) {

}

export default {
  created (el, binding, a, b) {
    console.log('created', el, binding, a, b)
    const value = determineValue(el, binding)

    if (binding.value === undefined) {
      el.dataset['vOverHasParentHandler'] = 'true'
      registerTargetHandler(el, bindings)
    }

    el.dataset['vOverDefaultDisplay'] = el.style.display
    el.style.position = 'absolute'

    if (value) {
      addHandling(el)
    } else {
      el.style.display = 'none'
    }
  },
  beforeUnmount (el, binding) {
    console.log('beforeUnmount', el, binding)
    if (el.dataset['vOverHasParentHandler'] = 'true') {
      unregisterTargetHandler(el, binding)
    }
  },
  updated (el, binding) {
    console.log('updated', el, binding)
    const { value } = binding

    if (value) {
      addHandling(el)
      el.style.display = el.dataset['display'] as string
    } else {
      removeHandling(el)
      el.style.display = 'none'
    }
  }
} as Directive<HTMLElement, OverDirectiveValue>