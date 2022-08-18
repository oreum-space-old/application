<template>
  <div class="ui-badge-line">
    <div class="ui-badge-line__badge-wrapper">
      <div class="ui-badge-line__badge">
        <slot />
      </div>
    </div>
    <div class="ui-badge-line__line" />
  </div>
</template>

<script
  setup
  lang="ts"
>

</script>

<style
  lang="scss"
  scoped
>
.ui-badge-line {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-top: 1px #ffffff1f;
  width: 100%;

  &__badge {
    background-color: var(--primary-color);
    padding: 0.25rem 0.4rem;
    border-radius: 4px;
    width: fit-content;
    color: var(--primary-color-text);

    &-wrapper {
      z-index: 1;
      width: fit-content;
      background-color: var(--surface-card);
      padding: 0 0.4rem;
    }

    :deep(.ui-h) {
      margin-left: 0;
    }

    :deep(.ui-h a) {
      margin-left: -1.5em;
    }
  }

  &__line {
    position: absolute;
    width: 100%;
    border-top: 1px solid var(--surface-border);
  }
}
</style>
