<template>
  <span
    v-if="!relative"
    :id="id"
    class="ui-anchor"
  />
  <div
    v-else
    class="ui-anchor-wrapper"
  >
    <span
      :id="id"
      class="ui-anchor"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
type Props = {
  id: string
  relative?: boolean
}
defineProps<Props>()
</script>

<style
  lang="scss"
  scoped
>
.ui-anchor {
  position: absolute;
  width: 0;
  height: 0;
  top: -108px;

  &-wrapper {
    position: relative;
    width: 0;
    height: 0;
  }
}
</style>
