import useApp from '@/stores/app'
import { defineStore } from 'pinia'

class Dialog {
  name: string
  element: HTMLElement
  state: ReturnType<typeof useDialog>

  constructor (element: HTMLElement) {
    this.element = element
    this.name = element.dataset.dialogName || 'unknown'
    this.element.dataset.dialogOpen = 'false'
    this.state = useDialog()
  }

  update () {
    this.state.crutch = !this.state.crutch
  }

  show () {
    this.element.dataset.dialogOpen = 'showing'
    setTimeout(() => {
      if (this.element.dataset.dialogOpen === 'showing') {
        this.element.dataset.dialogOpen = 'true'
      }
    }, 125)
    setTimeout(() => this.element.focus())
    this.update()
  }

  close () {
    this.element.dataset.dialogOpen = 'hiding'
    setTimeout(() => {
      if (this.element.dataset.dialogOpen === 'hiding') {
        this.element.dataset.dialogOpen = 'false'
      }
    }, 125)
    this.update()
  }

  get open () {
    return this.element.dataset.dialogOpen === 'true' || this.element.dataset.dialogOpen === 'showing'
  }
}

let app: ReturnType<typeof useApp>

const useDialog = defineStore('dialog', {
  state: () => ({
    dialogs: [] as Array<Dialog>,
    crutch: false
  }),
  getters: {
    openedDialogs (): Array<Dialog> {
      const result: Array<Dialog> = this.crutch ? [] : []

      for (const dialog of this.dialogs) {
        if (dialog.open) {
          result.push(dialog)
        }
      }

      document.documentElement.classList[result.length ? 'add' : 'remove']('dialog-prevent-scrolling')

      return result
    }
  },
  actions: {
    add (dialog: HTMLDialogElement) {
      const name = dialog.dataset.dialogName || 'unknown'
      const _dialog = this.dialogs.find(_ => _.name === name)

      if (!_dialog) {
        this.dialogs.push(new Dialog(dialog))
      } else {
        const index = this.dialogs.indexOf(_dialog)

        if (index !== -1) {
          this.dialogs[index] = _dialog
        }
      }
    },
    get (name: string): Dialog | undefined {
      return this.dialogs.find(_ => _.name === name)
    },
    show (dialog: Dialog | string) {
      if (!app) {
        app = useApp()
      }
      if (app.menu === 'shown') {
        app.menu = 'hidden'
      }
      if (dialog) {
        if (typeof dialog === 'string') {
          this.get(dialog)?.show()
          return
        }
        dialog.show()
      }
    },
    hide () {
      for (const dialog of this.openedDialogs) {
        dialog.close()
      }
    },
    close (dialog?: Dialog | string) {
      if (dialog) {
        if (typeof dialog === 'string') {
          this.get(dialog)?.close()
          return
        }
        dialog.close()
      }
    },
    unmount (dialog: string) {
      this.close(dialog)
      this.dialogs = this.dialogs.filter(_ => _.name !== dialog)
    }
  }
})

export default useDialog