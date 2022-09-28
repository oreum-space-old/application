<template>
  <ui-dialog
    classes="app-header-auth-registration"
    header="disabled"
    name="app-header-auth-registration"
  >
    <template #main>
      <img
        src="@/assets/logo/logo.svg"
        alt="Oreum Space"
      >
      <b class="app-header-auth-registration__subtitle">
        Other world!
      </b>
      <form>
        <ui-input-text
          v-model="username"
          label="Username"
          :async="usernameAsyncStatus"
        />
        <ui-input-text
          v-model="email"
          label="Email"
        />
        <ui-input-text
          v-model="password"
          label="Password"
        />
        <ui-button
          seriousness="success"
        >
          Continue
        </ui-button>
      </form>
      <span>OR</span>
      <div class="app-header-auth-registration__sign-with">
        <div>
          <o-auth-google />
        </div>
        <button class="sign-in-with-discord">
          <img
            src="@/assets/logo/discord-clyde.svg"
            alt="Discord Clyde"
          >
          <span>
            Join with Discord
          </span>
        </button>
      </div>
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
import OAuthGoogle from '@/components/google/OAuthGoogle.vue'
import UiInputText from '@/components/ui/input/UiInputText.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import type { UiInputTextAsync } from '@/components/ui/input/UiInputText.vue'
import useDialog from '@/stores/dialog'
import { ref } from 'vue'

const
  username = ref(''),
  usernameAsyncStatus = ref<UiInputTextAsync>('initial'),
  email = ref(''),
  password = ref(''),
  dialog = useDialog()
</script>

<style lang="scss">
.sign-in-with-discord {
  background-color: #5865F2;
  color: white;
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
    gap: 8px;

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
    gap: 8px;
    width: 280px;
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