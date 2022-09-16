<template>
  <ui-h
    id="buttons"
    level="2"
    class="mb2"
  >
    Dialog
  </ui-h>
  <ui-card>
    <ui-dialog
      name="example"
    >
      <template #main>
        MAIN OF DIALOG
      </template>
    </ui-dialog>
    <ui-button
      @click="dialog.show('example')"
    >
      Open Dialog
    </ui-button>
  </ui-card>
</template>

<script
  setup
  lang="ts"
>
import UiButton from '@/components/ui/UiButton.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import UiH from '@/components/ui/UiH.vue'
import useDialog from '@/stores/dialog'

const dialog = useDialog()
</script>

<style
  lang="scss"
  scoped
>

</style>