<template>
  <header class="header">
    <app-header-auth-registration-modal v-if="!authorized" />
    <app-header-logo />
    <app-header-navigation>
      <app-header-user v-if="authorized" />
      <app-header-auth v-else />
    </app-header-navigation>
  </header>
</template>

<script
  setup
  lang="ts"
>
import AppHeaderLogo from '@/components/app/header/AppHeaderLogo.vue'
import AppHeaderNavigation from '@/components/app/header/AppHeaderNavigation.vue'
import AppHeaderAuth from '@/components/app/header/auth/AppHeaderAuth.vue'
import AppHeaderUser from '@/components/app/header/AppHeaderUser.vue'
import AppHeaderAuthRegistrationModal from '@/components/app/header/auth/AppHeaderAuthRegistrationDialog.vue'
import useUser from '@/stores/user'
import { computed } from 'vue'

const user = useUser()
const authorized = computed(() => isFinite(user.id))
</script>
