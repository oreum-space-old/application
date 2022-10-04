<template>
  <ui-dialog
    classes="app-header-auth-registration"
    header="disabled"
    name="app-header-auth-registration"
    @show="inputUsernameFocus"
    @hide="hideHandler"
  >
    <template #main>
      <app-registration ref="appRegistration" />
    </template>
    <template #footer>
      <ui-button
        class="app-header-auth-registration__cancel"
        seriousness="passive"
        appearance="text"
        @click="dialog.close('app-header-auth-registration')"
      >
        Отмена
      </ui-button>
    </template>
  </ui-dialog>
</template>

<script
  setup
  lang="ts"
>
import AppRegistration from '@/components/app/AppRegistration.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import useDialog from '@/stores/dialog'
import { ref } from 'vue'

const
  dialog = useDialog(),
  appRegistration = ref<InstanceType<typeof AppRegistration>>()

function inputUsernameFocus () {
  if (appRegistration.value) {
    appRegistration.value.inputUsernameFocus()
  }
}

function _hideHandler () {
  if (appRegistration.value) {
    appRegistration.value.hideHandler()
  }
}

function hideHandler () {
  setTimeout(_hideHandler, 250)
}
</script>

<style lang="scss">
.sign-in-with-discord {
  background-color: #5865F2;
  display: flex;
  width: 100%;
  height: 40px;
  padding-block: 4px;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    text-align: center;
    flex: 1;
    color: white;
  }

  &:focus,
  &:active {
    background-color: #5865F2;
  }

  &:hover {
    background-color: #404AC4;
  }
}

.app-header-auth-registration {
  padding: 4px 12px;
  width: 360px;

  .ui-dialog__main {
    align-items: center;
  }

  &__subtitle {
    margin-bottom: 8px;
  }

  form {
    width: 280px;
    display: flex;
    flex-flow: column;
    gap: 12px;

    .ui-input {
      width: 280px;
    }
  }

  h2 {
    display: block;
  }

  &__cancel {
    display: block;
    width: 280px;
    margin-inline: auto;
  }

  &__sign-with {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 12px;
    width: 280px;
    max-height: 124px;
    transition: max-height 0.25s ease-in-out, margin-top 0.25s ease-in-out;
    overflow: hidden;

    &_hidden {
      max-height: 0;
      margin-top: -12px;
    }
  }
}

@media (max-width: 480px) {
  .app-header-auth-registration {
    width: 100%;
    height: 100%;
    border-radius: 0;

    .ui-dialog__main,
    .ui-dialog__footer {
      margin-block: auto;
    }
  }
}
</style>