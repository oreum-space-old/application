import { defineStore } from 'pinia'
import type { Ref, WritableComputedRef } from 'vue'

interface RawModal {
  name: string,
  visible: Ref<boolean> | WritableComputedRef<boolean>
}

class Modal {
  public name: string
  private _visible: Ref<boolean> | WritableComputedRef<boolean>
  private _context: ReturnType<typeof useModal>

  constructor (modal: RawModal, context: ReturnType<typeof useModal>) {
    this.name = modal.name
    this._visible = modal.visible
    this._context = context
    state.modals.set(this.name, this)
  }

  get visible (): boolean {
    return this._visible.value
  }

  set visible (value: boolean) {
    this._visible.value = value
    console.log(this.visible)
  }

  show () {
    this.visible = true
  }

  hide () {
    this.visible = false
  }

  toggle () {
    this.visible = !this.visible
  }

  destroy () {
    this._context._destroy(this)
  }
}

type ModalKey = Modal['name']

type State = {
  modals: Map<ModalKey, Modal>
}

const state: State = {
  modals: new Map()
}

const useModal = defineStore('modal', {
  getters: {
    state () {
      return state
    }
  },
  actions: {
    register (rawModal: RawModal): Modal {
      console.log('register')
      return new Modal(rawModal, this)
    },
    getModal (rawModal: Modal | string): Modal | null {
      console.log(rawModal)
      if (typeof rawModal === 'string') {
        return state.modals.get(rawModal) || null
      }
      return rawModal
    },
    show (rawModal: Modal | string): Modal | null {
      return this.getModal(rawModal)?.show() || null
    },
    hide (rawModal: Modal | string): Modal | null {
      return this.getModal(rawModal)?.hide() || null
    },
    clear (): void {
      console.log('clear')
      state.modals.forEach(_ => {
        _.visible && _.hide()
      })
    },
    toggle (rawModal: Modal | string): Modal | null {
      return this.getModal(rawModal)?.toggle() || null
    },
    destroy (rawModal: Modal | string): Modal | null {
      return this.getModal(rawModal)?.destroy() || null
    },
    _destroy (modal: Modal) {
      modal.hide()
      state.modals.delete(modal.name)
    }
  }
})

export default useModal