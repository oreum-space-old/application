import type { Instance } from '@popperjs/core'
import type { ComputedRef, Ref } from 'vue'

export default function (popper: Instance | null, visible: Ref<boolean> | ComputedRef<boolean>) {
  if (popper) {
    popper.state.elements.popper.dataset['popperHidden'] = visible.value ? 'false' : 'true'
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
