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
    <app-header-auth-registration-modal />
  </div>
</template>

<script
  setup
  lang="ts"
>
import AppHeaderAuthRegistrationModal from '@/components/app/header/auth/AppHeaderAuthRegistrationModal.vue'
import UiButton from '@/components/ui/UiButton.vue'
import useDialog from '@/stores/dialog'

const dialog = useDialog()
</script>

<style
  lang="scss"
  scoped
>
.app-header-auth {
  display: flex;
  justify-content: flex-end;
  flex: 1;
  gap: 16px;
  align-items: center;
}
</style>