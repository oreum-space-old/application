<template>
  <app-loader v-if="loading" />
  <template v-else>
    <app-scroll />
    <app-dialog />
    <app-header />
    <router-view
      v-if="route.meta.main"
      class="main"
    />
    <main
      v-else
      class="main"
    >
      <router-view />
    </main>
    <app-footer @click="dialogShow" />
  </template>
</template>

<script
  setup
  lang="ts"
>
import AppDialog from '@/components/app/AppDialog.vue'
import AppFooter from '@/components/app/AppFooter.vue'
import AppLoader from '@/components/app/AppLoader.vue'
import AppScroll from '@/components/app/AppScroll.vue'
import AppHeader from '@/components/app/header/AppHeader.vue'
import useApp from '@/stores/app'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

useApp()
const route = useRoute()
const dialog = ref<HTMLDialogElement>()
const loading = ref<boolean>(true)

function dialogShow () {
  if (dialog.value) {
    dialog.value.show()
  }
}

const app = useApp()
onMounted(() => {
  app.load()
    .then(() => {
      loading.value = false
    })
})
</script>
