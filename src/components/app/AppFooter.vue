<template>
  <footer>
    <section>
      a
    </section>
    <section>
      b
    </section>
    <ui-modal
      name="app-footer"
    >
      <template #body>
        test
      </template>
    </ui-modal>
    <section
      @click="show"
    >
      c
    </section>
  </footer>
</template>

<script
  setup
  lang="ts"
>
import UiModal from '@/components/ui/UiModal.vue'
import useModal from '@/stores/modal'

const modal = useModal()

function show () {
  console.log(modal.show('app-footer'))
}
</script>

<style
  lang="scss"
  scoped
>
</style>
