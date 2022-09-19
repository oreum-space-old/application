<template>
  <app-header />
  <router-view v-if="route.meta.main" />
  <main
    v-else
    class="main"
  >
    <router-view />
  </main>
  <app-dialog />
  <app-footer @click="dialogShow" />
</template>

<script
  setup
  lang="ts"
>
import AppDialog from '@/components/app/AppDialog.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import AppHeader from '@/components/app/AppHeader.vue'
import useApp from '@/stores/app'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

useApp()
const route = useRoute()
const dialog = ref<HTMLDialogElement>()

function dialogShow () {
  if (dialog.value) {
    dialog.value.show()
  }
}
</script>
