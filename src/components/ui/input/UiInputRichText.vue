<template>
  <div class="ui-rich-text">
    <div class="ui-rich-text__tools">
      todo
    </div>
    <div
      class="ui-rich-text__content"
      contenteditable="true"
    >
      todo
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
type Props = {
  modelValue: string
}
defineProps<Props>()
</script>

<style
  lang="scss"
  scoped
>

</style>