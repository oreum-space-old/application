<template>
  <main class="main main_activation">
    <app-code-activation :link="link" />
  </main>
</template>

<script
  setup
  lang="ts"
>
import AppCodeActivation from '@/components/app/activation/AppCodeActivation.vue'

type Props = {
  link: string
}
defineProps<Props>()
</script>