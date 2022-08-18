<template>
  <label
    class="ui-input-checkbox__label"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      role="checkbox"
      class="ui-input-checkbox"
      :class="{ 'ui-input-checkbox_checked': modelValue }"
    >
      <span class="ui-input-checkbox__icon" />
    </span>
    <span class="ui-input-checkbox__text">
      {{ label }}
    </span>
  </label>
</template>

<script
  setup
  lang="ts"
>
type Props = {
  label?: string
  modelValue: boolean
}
defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style
  lang="scss"
  scoped
>

</style>
