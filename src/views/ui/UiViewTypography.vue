<template>
  <ui-h
    id="typography"
    level="2"
  >
    Typography
  </ui-h>
  <ui-card>
    <ui-h
      id="typography-headers"
      level="3"
      class="mb2"
    >
      Headers
    </ui-h>
    <div class="flex">
      <span class="h1">h1 element</span>
      <span class="h2">h2 element</span>
      <span class="h3">h3 element</span>
      <span class="h4">h4 element</span>
      <span class="h5">h5 element</span>
      <span class="h6">h6 element</span>
    </div>
  </ui-card>
  <ui-card>
    <ui-h
      id="typography-elements"
      level="3"
      class="mb2"
    >
      Elements
    </ui-h>
    <div class="flex">
      <p>Вы можете использовать тег метки, чтобы <mark>выделить</mark> текст.</p>
      <p><del>Эта строка текста должна рассматриваться как удаленный текст.</del></p>
      <p><s>Эта строка текста должна рассматриваться как неточная.</s></p>
      <p><ins>Эта строка текста должна рассматриваться как дополнение к документу.</ins></p>
      <p><u>Эта строка текста будет отображаться как подчеркнутая.</u></p>
      <p><small>Эта строка текста должна рассматриваться как мелкий шрифт.</small></p>
      <p><strong>Эта строка выделена жирным шрифтом.</strong></p>
      <p><em>Эта строка отображается как выделенный курсивом текст.</em></p>
    </div>
  </ui-card>
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

</style>
