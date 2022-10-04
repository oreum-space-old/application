<template>
  <section class="app-header-logo">
    <router-link to="/">
      <svg width="192">
        <use
          :href="`${oreumLogo}#svg`"
          color="var(--surface-900)"
        />
      </svg>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import oreumLogo from '@/assets/logo/oreum-logo.svg'
</script>