<template>
  <teleport to="#app-dialog">
    <div
      ref="dialog"
      role="dialog"
      class="ui-dialog"
      :data-dialog-name="name"
      @click="click"
      @keydown.esc="keydownEsc"
    >
      <slot name="custom">
        <header class="ui-dialog__header">
          <slot name="header-with-button">
            <slot name="header">
              <h4 class="h5">
                Dialog
              </h4>
            </slot>
            <ui-icon
              icon="close-small"
              button
              @click="close"
            />
          </slot>
        </header>
        <main class="ui-dialog__main">
          <slot name="main">
            Dialog main
          </slot>
        </main>
        <footer class="ui-dialog__footer">
          <slot name="footer">
            <span>
              Dialog footer
            </span>
            <ui-button
              appearance="outlined"
              seriousness="passive"
              @click="close"
            >
              Закрыть
            </ui-button>
          </slot>
        </footer>
      </slot>
    </div>
  </teleport>
</template>

<script
  setup
  lang="ts"
>
import UiButton from '@/components/ui/UiButton.vue'
import UiIcon from '@/components/ui/UiIcon.vue'
import useDialog from '@/stores/dialog'
import { onMounted, ref } from 'vue'

type Props = {
  name: string
}
const
  props = defineProps<Props>(),
  dialog = ref<HTMLDialogElement>(),
  dialogState = useDialog()

onMounted(() => {
  if (dialog.value) {
    dialogState.add(dialog.value)
  }
})

function click (event: Event) {
  console.log(event.composedPath())
}

function keydownEsc () {
  close()
}

function close () {
  console.log('close')
  dialogState.close(props.name)
}

</script>

<style
  lang="scss"
  scoped
>
.ui-dialog {
  position: fixed;
  background-color: var(--surface-overlay);
  box-shadow: var(--surface-overlay-shadow);
  height: fit-content;
  margin: auto;
  left: 50%;
  top: 50%;
  translate: calc(-50%) calc(-50% - 32px);
  transition: translate 0.25s ease-in-out;

  border-radius: 8px;

  &[data-dialog-open=true] {
    display: flex;
    flex-flow: column;
    translate: calc(-50%) -50%;
    transition: translate 0.125s ease-in-out;
  }

  &__header,
  &__main,
  &__footer {
    padding: 12px 16px;
  }

  &__header {
    box-shadow: 0 3px 5px rgb(0 0 0 / 2%), 0 0 2px rgb(0 0 0 / 5%), 0 1px 4px rgb(0 0 0 / 8%);
  }

  &__main {
    padding: 16px;
    min-height: 92px;
    min-width: 240px;
  }

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>