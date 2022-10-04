<template>
  <main class="main flex gap4">
    <ui-h
      id="user-interface"
      level="1"
    >
      User Interface
    </ui-h>
    <div class="flex-row">
      <ui-async-status model-value="initial" />
      <ui-async-status model-value="invalid" />
      <ui-async-status model-value="valid" />
      <ui-async-status model-value="error" />
      <ui-async-status model-value="sending" />
      <ui-flag flag="ru" />
      <ui-flag flag="ua" />
      <ui-flag flag="ca" />
      <ui-flag flag="hu" />
      <ui-flag flag="cz" />
    </div>
    <ui-view-typography />
    <ui-view-inputs />
    <ui-view-rich-text />
    <ui-view-buttons />
    <ui-view-dialog />
  </main>
</template>

<script
  setup
  lang="ts"
>
import UiAsyncStatus from '@/components/ui/UiAsyncStatus.vue'
import UiFlag from '@/components/ui/UiFlag.vue'
import UiH from '@/components/ui/UiH.vue'
import UiViewButtons from '@views/ui/UiViewButtons.vue'
import UiViewDialog from '@views/ui/UiViewDialog.vue'
import UiViewInputs from '@views/ui/UiViewInputs.vue'
import UiViewRichText from '@views/ui/UiViewRichText.vue'
import UiViewTypography from '@views/ui/UiViewTypography.vue'
</script>
