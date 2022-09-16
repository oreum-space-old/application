<template>
  <teleport to="#modals">
    <div
      v-if="visible"
      class="ui-modal"
    >
      <slot>
        <div class="ui-modal__header">
          <slot name="header">
            {{ visible }} {{ name }}
          </slot>
        </div>
        <div class="ui-modal__body">
          <slot name="body">
            body
          </slot>
        </div>
        <div class="ui-modal__footer">
          <slot name="footer">
            footer
          </slot>
        </div>
      </slot>
    </div>
  </teleport>
</template>

<script
  setup
  lang="ts"
>
import useModal from '@/stores/modal'
import { computed, onBeforeUnmount, ref } from 'vue'

const
  props = defineProps({
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: undefined
    }
  }),
  emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

const
  visible = props.modelValue !== undefined ? computed<boolean>({
    get (): boolean {
      return props.modelValue || false
    },
    set (value: boolean) {
      emits('update:modelValue', value)
    }
  }) : ref<boolean>(false),
  modals = useModal(),
  modal = modals.register({
    name: props.name,
    visible
  })

console.log(props.modelValue)

onBeforeUnmount(function () {
  modal.destroy()
})
</script>

<style
  lang="scss"
  scoped
>

</style>