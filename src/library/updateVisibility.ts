import type { Instance } from '@popperjs/core'
import type { Ref } from 'vue'

export default function (popper: Instance | null, visible: Ref<boolean>) {
  if (popper) {
    popper.state.elements.popper.style.visibility = visible.value ? '' : 'hidden'
    popper.state.elements.popper.style.pointerEvents = visible.value ? '' : 'none'
    const promise = popper.setOptions((options) => ({
      ...options,
      modifiers: [
        ...(options.modifiers || []),
        { name: 'eventListeners', enabled: visible.value }
      ]
    }))

    if (visible.value) {
      promise.then(() => {
        if (visible.value) {
          popper.update()
        }
      })
    }
  }
}
