<template>
  <ui-dialog
    classes="app-header-auth-registration"
    header="disabled"
    name="app-header-auth-registration"
    footer="disabled"
  >
    <template #main>
      <h2 class="h2">
        Welcome to Oreum Space
      </h2>
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
      <div>
        <o-auth-google />
      </div>
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
import { ref } from 'vue'

const
  username = ref(''),
  usernameAsyncStatus = ref<UiInputTextAsync>('initial'),
  email = ref(''),
  password = ref('')
</script>

<style
  lang="scss"
>
.app-header-auth-registration {
  padding: 16px 8px;

  .ui-dialog__main {
    align-items: center;
  }
  &__subtitle {
    margin-bottom: 16px;
  }
  form {
    display: flex;
    flex-flow: column;
    width: fit-content;
    gap: 8px;
  }
}
</style>