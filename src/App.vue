<template>
  <app-header />
  <router-view v-if="route.meta.main" />
  <main v-else>
    <router-view />
  </main>
  <aside
    id="modals"
    class="modals-container"
    @click="modals.clear"
  />
  <app-footer />
</template>

<script
  setup
  lang="ts"
>
import AppFooter from '@/components/app/AppFooter.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import useApp from '@/stores/app'
import useModal from '@/stores/modal'
import { useRoute } from 'vue-router'
useApp()
const
  route = useRoute(),
  modals = useModal()
</script>
