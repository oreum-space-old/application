<template>
  <main class="main flex gap4">
    <ui-h
      id="user-interface"
      level="1"
    >
      User Interface
    </ui-h>
    <ui-view-typography />
    <ui-view-inputs />
    <ui-view-buttons />
    <ui-view-dialog />
  </main>
</template>

<script
  setup
  lang="ts"
>
import UiH from '@/components/ui/UiH.vue'
import UiViewButtons from '@views/ui/UiViewButtons.vue'
import UiViewDialog from '@views/ui/UiViewDialog.vue'
import UiViewInputs from '@views/ui/UiViewInputs.vue'
import UiViewTypography from '@views/ui/UiViewTypography.vue'
</script>
