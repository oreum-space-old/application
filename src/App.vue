<template>
  <app-header />
  <router-view v-if="route.meta.main" />
  <main v-else>
    <router-view />
  </main>
  <app-footer />
</template>

<script
  setup
  lang="ts"
>
import AppFooter from '@/components/app/AppFooter.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
