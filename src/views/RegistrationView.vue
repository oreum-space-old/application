<template>
  <main class="main main_registration">
    <section class="main__registration">
      <app-registration />
    </section>
  </main>
</template>

<script
  setup
  lang="ts"
>

import AppRegistration from '@/components/app/AppRegistration.vue'
</script>

<style lang="scss">
.main__registration {
  align-items: center;
  padding: 16px;
  min-height: 92px;
  min-width: 240px;
  display: flex;
  flex-flow: column;
  gap: 12px;

  form {
    width: 280px;
    display: flex;
    flex-flow: column;
    gap: 12px;

    .ui-input {
      width: 280px;
    }
  }
}
</style>