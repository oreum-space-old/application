<template>
  <ui-dialog
    classes="app-header-auth-registration"
    header="disabled"
    name="app-header-auth-registration"
    @show="inputUsernameFocus"
  >
    <template #main>
      <h2 class="app-header-auth-registration__subtitle">
        Registration
      </h2>
      <form
        autocomplete="off"
        @focusin="formFocusHandler"
        @focusout="formBlurHandler"
      >
        <ui-input-text
          ref="inputUsername"
          v-model="username"
          autocomplete="nickname"
          label="Username"
          maxlength="16"
          :invalid="['invalid', 'error'].includes(usernameAsyncStatus)"
          @update:model-value="preValidateUsername"
        >
          <template #ui-error-hint="{ focused, input }">
            <ui-error-hint
              v-if="input"
              :focused="focused"
              :input="input"
              description="Имя пользователя будет использовать для отображения вашего профиля в чатах и игровом клиенте"
              :errors="usernameErrors"
            />
          </template>
          <ui-async-status
            v-model="usernameAsyncStatus"
          />
        </ui-input-text>
        <ui-input-text
          v-model="email"
          autocomplete="email"
          type="email"
          label="Email"
          maxlength="64"
          :invalid="['invalid', 'error'].includes(emailAsyncStatus)"
          @update:model-value="preValidateEmail"
        >
          <template #ui-error-hint="{ focused, input }">
            <ui-error-hint
              v-if="input"
              :focused="focused"
              :input="input"
              description="Email будет виден только для вас, и будет использоваться для активации и восстановления аккаунта"
              :errors="emailErrors"
            />
          </template>
          <ui-async-status
            v-model="emailAsyncStatus"
          />
        </ui-input-text>
        <ui-input-text
          v-model="password"
          type="password"
          autocomplete="new-password"
          label="Password"
          :invalid="password !== '' && password.length < 8"
        />
        <ui-button
          seriousness="success"
          :disabled="emailAsyncStatus !== 'valid' || usernameAsyncStatus !== 'valid' || password.length < 8"
        >
          Continue
        </ui-button>
      </form>
      <div
        class="app-header-auth-registration__sign-with"
        :class="{
          'app-header-auth-registration__sign-with_hidden': mobileFormFocus || password || email || username
        }"
      >
        <span>OR</span>
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
import UiAsyncStatus, { UiAsyncStatusProps } from '@/components/ui/UiAsyncStatus.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import UiErrorHint from '@/components/ui/UiErrorHint.vue'
import userService from '@/services/userService'
import useApp from '@/stores/app'
import useDialog from '@/stores/dialog'
import type { ApiError } from '@/types/ApiError'
import { ref } from 'vue'

const
  username = ref(''),
  usernameErrors = ref<Array<string>>([]),
  usernameAsyncStatus = ref<UiAsyncStatusProps['modelValue']>('initial'),
  email = ref(''),
  emailErrors = ref<Array<string>>([]),
  emailAsyncStatus = ref<UiAsyncStatusProps['modelValue']>('initial'),
  password = ref(''),
  dialog = useDialog(),
  inputUsername = ref<InstanceType<typeof UiInputText>>(),
  app = useApp(),
  mobileFormFocus = ref<boolean>(false)

function preValidateUsername () {
  const errors = []
  if (!username.value) {
    errors.push('username-required')
  }
  if (username.value.length < 3) {
    errors.push('username-short')
  }
  if (username.value.length > 16) {
    errors.push('username-long')
  }
  if (!/^[a-zA-ZА-Яа-я\d_]{0,16}$/.test(username.value)) {
    errors.push('username-invalid')
  }
  if (errors.length) {
    usernameErrors.value = errors
    return void (usernameAsyncStatus.value = 'invalid')
  }
  validateUsername()
}

function validateUsername () {
  if (usernameAsyncStatus.value !== 'sending' && username.value) {
    usernameErrors.value = []
    usernameAsyncStatus.value = 'sending'
    userService
      .validateUsername(username.value)
      .then((response) => {
        if (response.username !== username.value) {
          usernameAsyncStatus.value = 'initial'
          validateUsername()
          return response
        }
        if (response.taken) {
          usernameAsyncStatus.value = 'invalid'
          usernameErrors.value = ['username-taken']
          return response
        }
        usernameAsyncStatus.value = 'valid'
        return response
      })
      .catch((reason: ApiError) => {
        if (reason) {
          for (const error of reason.errors) {
            if (error.field === 'username') {
              usernameErrors.value = [error.text]
            }
          }
        } else {
          usernameErrors.value = ['server-error']
        }
        usernameAsyncStatus.value = 'error'
        return reason
      })
    return
  }
  usernameAsyncStatus.value = 'initial'
}

function preValidateEmail () {
  const errors = []
  if (!email.value) {
    errors.push('email-required')
  }
  // eslint-disable-next-line vue/max-len
  if (!/^[a-zA-Z\d.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(email.value)) {
    errors.push('email-invalid')
  }
  if (errors.length) {
    emailErrors.value = errors
    return void (emailAsyncStatus.value = 'invalid')
  }
  validateEmail()
}

function validateEmail () {
  if (emailAsyncStatus.value !== 'sending' && username.value) {
    emailErrors.value = []
    emailAsyncStatus.value = 'sending'
    userService
      .validateEmail(email.value)
      .then((response) => {
        if (response.email !== email.value) {
          emailAsyncStatus.value = 'initial'
          validateEmail()
          return response
        }
        if (response.taken) {
          emailAsyncStatus.value = 'invalid'
          emailErrors.value = ['email-taken']
          return response
        }
        emailAsyncStatus.value = 'valid'
        return response
      })
      .catch((reason: ApiError) => {
        if (reason) {
          for (const error of reason.errors) {
            if (error.field === 'email') {
              emailErrors.value = [error.text]
            }
          }
        } else {
          emailErrors.value = ['server-error']
        }
        emailAsyncStatus.value = 'error'
        return reason
      })
    return
  }
  usernameAsyncStatus.value = 'initial'
}

function inputUsernameFocus () {
  if (inputUsername.value && app.width > 480) {
    setTimeout(inputUsername.value.focus, 250)
  }
}

function formFocusHandler () {
  if (inputUsername.value && app.width <= 480 && !mobileFormFocus.value) {
    mobileFormFocus.value = true
  }
}

function formBlurHandler () {
  if (mobileFormFocus.value) {
    mobileFormFocus.value = false
  }
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