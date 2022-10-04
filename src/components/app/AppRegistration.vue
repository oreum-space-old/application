<template>
  <h2 class="app-header-auth-registration__subtitle">
    {{ l`registration` }}
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
      :label="l`field-username`"
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
      :label="l`field-email`"
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
      :label="l`field-password`"
      :invalid="!!passwordErrors.length"
      maxlength="32"
      @update:model-value="validatePassword"
    >
      <template #ui-error-hint="{ focused, input }">
        <ui-error-hint
          v-if="input"
          :focused="focused && !!passwordErrors.length"
          :input="input"
          :errors="passwordErrors"
        />
      </template>
    </ui-input-text>
    <ui-button
      seriousness="success"
      :disabled="emailAsyncStatus !== 'valid' || usernameAsyncStatus !== 'valid' || !!passwordErrors.length"
    >
      {{ l`button-continue` }}
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
        {{ l`join-with-discord` }}
      </span>
    </button>
  </div>
</template>

<script
  setup
  lang="ts"
>
import OAuthGoogle from '@/components/google/OAuthGoogle.vue'
import UiInputText from '@/components/ui/input/UiInputText.vue'
import UiAsyncStatus, { UiAsyncStatusProps } from '@/components/ui/UiAsyncStatus.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiErrorHint from '@/components/ui/UiErrorHint.vue'
import userService from '@/services/userService'
import useApp from '@/stores/app'
import useLang from '@/stores/lang'
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
  passwordErrors = ref<Array<string>>([]),
  inputUsername = ref<InstanceType<typeof UiInputText>>(),
  app = useApp(),
  mobileFormFocus = ref<boolean>(false),
  { l } = useLang()

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
        if (reason?.errors) {
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
        if (reason?.errors) {
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

function validatePassword () {
  const errors = []
  if (!password.value) {
    errors.push('password-required')
  }
  if (password.value.length < 8) {
    errors.push('password-short')
  }
  if (password.value.length > 32) {
    errors.push('password-long')
  }
  if (!/(^[a-zA-ZА-Яа-я\d.,#?!@$%^&*_-]{0,32}$)/.test(password.value)) {
    errors.push('password-invalid')
  }
  passwordErrors.value = errors
}

function inputUsernameFocus () {
  if (inputUsername.value && app.width > 480) {
    setTimeout(inputUsername.value.focus, 250)
  }
}

function hideHandler () {
  username.value = ''
  usernameErrors.value = []
  email.value = ''
  emailErrors.value = []
  password.value = ''
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

defineExpose({
  inputUsernameFocus,
  hideHandler
})
</script>

<style
  lang="scss"
  scoped
>

</style>