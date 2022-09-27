<template>
  <header class="header">
    <app-header-logo />
    <app-header-navigation />
    <app-header-user v-if="isFinite(user.id)" />
    <app-header-auth v-else />
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
import useUser from '@/stores/user'

const user = useUser()
</script>
