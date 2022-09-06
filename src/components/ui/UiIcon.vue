<template>
  <svg
    class="ui-icon"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    :style="style"
  >
    <use
      :href="`${icons}#${icon}`"
      @error="error"
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import icons from '@/assets/icons.svg'
import { computed, onMounted, ref, watch } from 'vue'

const
  props = defineProps<{
    icon: string
    rotate?: string
  }>(),
  style = computed(() => props.rotate ? { transform: `rotate(${props.rotate}deg)` } : undefined)

function error (event: Event) {
  console.log('error', event)
}
</script>


<!--<template>
  <img
    class="ui-icon"
    :src="src"
    :style="style"
    alt="icon"
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
</script>-->