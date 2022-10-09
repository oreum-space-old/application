<template>
  <main class="main main_activation">
    <app-link-activation :link="link" />
  </main>
</template>

<script
  setup
  lang="ts"
>
import AppLinkActivation from '@/components/app/activation/AppLinkActivation.vue'

type Props = {
  link: string
}
defineProps<Props>()
</script>