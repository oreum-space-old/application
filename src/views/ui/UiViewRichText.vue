<template>
  <ui-h
    id="rich-text"
    level="2"
    class="mb2"
  >
    Rich Text
  </ui-h>
  <ui-card class="pv6">
    <ui-input-rich-text
      v-model="value"
    />
  </ui-card>
</template>

<script
  setup
  lang="ts"
>
import UiCard from '@/components/ui/UiCard.vue'
import UiH from '@/components/ui/UiH.vue'
import UiInputRichText from '@/components/ui/input/UiInputRichText.vue'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<style
  lang="scss"
  scoped
>

</style>