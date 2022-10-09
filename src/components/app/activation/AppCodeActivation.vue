<template>
  <section class="app-code-activation">
    <ui-input-code v-model="code" />
  </section>
</template>

<script
  setup
  lang="ts"
>
import UiInputCode from '@/components/ui/input/UiInputCode.vue'
import { ref } from 'vue'

const code = ref<string>('')
</script>

<style lang="scss">

</style>