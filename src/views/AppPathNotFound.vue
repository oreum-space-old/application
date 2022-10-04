<template>
  <main class="main main_not-found">
    <svg
      class="logo"
      width="192"
      height="48"
    >
      <use
        :href="`${oreumLogo}#svg`"
        color="var(--surface-900)"
      />
    </svg>
    <ui-card class="align-center">
      <h1>
        404
      </h1>
      <h2>
        {{ l`page-lost-title` }}
      </h2>
      <h6>
        {{ l`page-lost-subtitle` }}
      </h6>
      <ui-button
        appearance="outlined"
        class="w100"
        size="small"
      >
        <ui-icon icon="report" />
        <span>{{ l`report-problem` }}</span>
      </ui-button>
      <div class="flex-row justify-between w100">
        <ui-button
          size="small"
          @click="router.back()"
        >
          <ui-icon icon="arrow-back" />
          {{ l`back` }}
        </ui-button>
        <ui-button
          size="small"
          @click="router.push('/home')"
        >
          <ui-icon icon="home" />
          <span>{{ l`page-home` }}</span>
        </ui-button>
      </div>
    </ui-card>
  </main>
</template>

<script
  setup
  lang="ts"
>
import UiButton from '@/components/ui/UiButton.vue'
import UiCard from '@/components/ui/UiCard.vue'
import oreumLogo from '@/assets/logo/oreum-logo.svg'
import UiIcon from '@/components/ui/UiIcon.vue'
import useLang from '@/stores/lang'
import { useRouter } from 'vue-router'

const router = useRouter(),
  { l } = useLang()
</script>

<style lang="scss">
.main_not-found {
  display: flex;
  flex-flow: column;
  gap: 24px;
  align-items: center;
  justify-content: center;

  .logo {
    scale: 2;
    translate: 72px;
    margin: 24px -120px 24px 24px;
    clip-path: polygon(0 0, 0 48px, 40px 48px, 40px 0);
  }

  .card {
    margin-bottom: 128px;
  }
}
</style>