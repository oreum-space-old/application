<template>
  <div>
    <!--
      TODO:
      <ui-input-check-box
        v-for="checkbox in checkboxes"
        :key="checkbox"
      />
    -->
  </div>
</template>

<script
  setup
  lang="ts"
>
/* import UiInputCheckBox from '@/components/ui/input/UiInputCheckBox.vue' */

type Props = {
  modelValue: Array<string> | Record<string, boolean>
  checkboxes: Array<string>
}
defineProps<Props>()
</script>

