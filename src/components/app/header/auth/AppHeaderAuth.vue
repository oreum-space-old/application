<template>
  <div class="app-header-auth">
    <ui-button
      seriousness="secondary"
      appearance="outlined"
      :disabled="!!dialog.openedDialogs.length"
    >
      {{ l`login` }}
    </ui-button>
    <ui-button
      seriousness="success"
      :disabled="!!dialog.openedDialogs.length"
      @click="router.push({ name: 'Registration' })"
    >
      {{ l`registration` }}
    </ui-button>
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiButton from '@/components/ui/UiButton.vue'
import useDialog from '@/stores/dialog'
import useLang from '@/stores/lang'
import { useRouter } from 'vue-router'

const dialog = useDialog()
const { l } = useLang()
const router = useRouter()
</script>

<style lang="scss">
.app-header-auth {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  flex: 1;
}
</style>