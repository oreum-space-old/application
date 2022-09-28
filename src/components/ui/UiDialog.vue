<template>
  <teleport to="#app-dialog">
    <div
      ref="dialog"
      role="dialog"
      class="ui-dialog"
      :class="classes"
      :data-dialog-name="name"
      @click="click"
      @keydown.esc="keydownEsc"
    >
      <slot name="custom">
        <header
          v-if="header !== 'disabled'"
          class="ui-dialog__header"
          :class="{ 'ui-dialog__header_connected': header === 'connected' }"
        >
          <slot name="header-with-button">
            <slot name="header">
              <h4 class="h5">
                {{ title }}
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
        <footer
          v-if="footer !== 'disabled'"
          class="ui-dialog__footer"
        >
          <slot name="footer">
            <ui-button
              appearance="outlined"
              seriousness="passive"
              @click="close"
            >
              Закрыть
            </ui-button>
            <slot name="footer-buttons" />
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
import { onBeforeUnmount, onMounted, ref } from 'vue'

type Props = {
  title?: string
  classes?: string
  header?: 'connected' | 'disabled'
  footer?: 'disabled'
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


onBeforeUnmount(() => {
  dialogState.unmount(props.name)
})

</script>

<style lang="scss">
.ui-dialog {
  position: relative;
  --background-color: var(--surface-overlay);
  background-color: var(--background-color);
  box-shadow: var(--surface-overlay-shadow);
  height: fit-content;
  left: 50%;
  top: 50%;
  translate: calc(-50%) calc(-50% - 16px);
  transition: translate 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  display: none;
  flex-flow: column;
  border-radius: 8px;
  width: fit-content;

  &[data-dialog-open=hiding] {
    display: flex;
  }

  &[data-dialog-open=showing] {
    display: flex;
  }

  &[data-dialog-open=true] {
    display: flex;
    translate: calc(-50%) -50%;
  }

  &__header,
  &__main,
  &__footer {
    padding: 12px 16px;
  }

  &__header {
    box-shadow: 0 3px 5px rgb(0 0 0 / 2%), 0 0 2px rgb(0 0 0 / 5%), 0 1px 4px rgb(0 0 0 / 8%);
  }

  &__header_connected {
    box-shadow: unset;
    padding-bottom: 0;
  }

  &__main {
    padding: 16px;
    min-height: 92px;
    min-width: 240px;

    display: flex;
    flex-flow: column;
    gap: 12px;
  }

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>