<template>
  <ui-card>
    <h4>
      status: {{ session.state.status }}
    </h4>
    <code
      ref="terminal"
      class="terminal"
      @click="focusCursor"
    >
      <span
        v-for="ansi of console"
        :key="ansi.id"
        :style="{
          color: ansi.color,
          backgroundColor: ansi.background,
        }"
      >
        {{ ansi.text }}
      </span>
      <input
        ref="cursor"
        type="text"
        @keydown.enter="line"
      >
    </code>
  </ui-card>
</template>

<script
  setup
  lang="ts"
>
import UiCard from '@/components/ui/UiCard.vue'
import { computed, ref, watch } from 'vue'
import terminalService from '@/services/terminalService'

const
  terminal = ref<HTMLInputElement>(),
  cursor = ref<HTMLInputElement>(),
  focusCursor = () => cursor.value?.focus()
const session = ref(terminalService.newTerminalSession({
  username: '179da',
  host: 'localhost',
  port: 22,
  password: 'vxvjlte7Pto1'
}))
const console = computed(() => session.value.state.console)
watch(console, () => {
  if (terminal.value) {
    terminal.value.scrollTop = terminal.value.scrollHeight
  }
})
function line () {
  if (cursor.value) {
    session.value.line(cursor.value.value)
    cursor.value.value = ''
  }
}
</script>

<style
  lang="scss"
  scoped
>

</style>