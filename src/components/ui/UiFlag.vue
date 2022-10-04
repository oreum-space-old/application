<template>
  <svg
    class="ui-flag"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="18"
    viewBox="0 0 640 480"
  >
    <use :href="`${flags}#${flag}`" />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import flags from '@/assets/flags.svg'

type Props = {
  flag: string
}
defineProps<Props>()
</script>

<style
  lang="scss"
  scoped
>
.ui-flag {
  margin-block: 3px;

  &_right {
    margin-right: 8px;
  }

  &_small {
    margin-block: 1px;
  }
}
</style>