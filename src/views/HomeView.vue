<template>
  <main class="main main_home home">
    <img
      class="home__logo"
      src="@/assets/logo/logo.svg"
      alt="OreumSpace"
    >
    <div
      class="home__news"
    >
      <ui-h
        id="news"
        level="2"
      >
        Новости
      </ui-h>
      <ui-card>
        <ui-h
          id="project-development"
          level="4"
        >
          Разработка проекта
        </ui-h>
      </ui-card>
    </div>
    <ui-card
      class="home__sidebar"
      tag="aside"
    >
      sidebar
    </ui-card>
  </main>
</template>

<script
  setup
  lang="ts"
>
import UiCard from '@/components/ui/UiCard.vue'
import UiH from '@/components/ui/UiH.vue'
</script>

<style
  lang="scss"
  scoped
>
.home {
  display: grid;
  grid-template-columns: auto 384px;
  grid-template-rows: auto auto;
  gap: 24px;

  &__logo {
    width: 100%;
    max-width: 576px;
    margin: auto;
    grid-row: 1;
    grid-column: 1 / 2;
  }

  &__news {
    grid-row: 2;
    display: flex;
    flex-flow: column;
    gap: 16px;
  }

  &__sidebar {
    grid-column: 2;
    grid-row: 1 / -1;
  }
}
</style>
