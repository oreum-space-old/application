<template>
  <div class="app-header-auth">
    <ui-button
      seriousness="secondary"
      appearance="outlined"
      :disabled="!!dialog.openedDialogs.length"
    >
      Вход
    </ui-button>
    <ui-button
      seriousness="success"
      :disabled="!!dialog.openedDialogs.length"
      @click="dialog.show('app-header-auth-registration')"
    >
      Регистрация
    </ui-button>
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiButton from '@/components/ui/UiButton.vue'
import useDialog from '@/stores/dialog'

const dialog = useDialog()
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