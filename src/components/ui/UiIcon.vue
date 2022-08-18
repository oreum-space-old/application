<template>
  <img
    class="ui-icon"
    :src="src"
    alt="icon"
    :style="style"
  >
</template>

<script
  setup
  lang="ts"
>
import Icons from '@/library/icons'
import { computed, ref } from 'vue'
import empty from '@/assets/icons/empty.svg'
const
  props = defineProps<{
    icon: string
    rotate?: string
  }>(),
  _src = ref<string>(''),
  src = computed(() => _src.value || empty),
  style = props.rotate ? { transform: `rotate(${props.rotate}deg)` } : undefined

Icons.useIcon(props.icon).then((result) => {
  _src.value = result.default
})
</script>