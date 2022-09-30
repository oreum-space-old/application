<template>
  <div
    class="ui-async-status"
    :class="`ui-async-status_${modelValue}`"
  >
    <ui-icon
      class="ui-async-status__cloud"
      :icon="`cloud`"
    />
    <ui-icon
      class="ui-async-status__status"
      :icon="`cloud-${modelValue}`"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import UiIcon from '@/components/ui/UiIcon.vue'

export type UiAsyncStatusProps = {
  modelValue: 'initial' | 'sending' | 'valid' | 'invalid' | 'error'
}
defineProps<UiAsyncStatusProps>()
</script>

<style lang="scss">
.ui-async-status {
  position: relative;
  pointer-events: none;

  &__cloud {
    left: 0;
    top: 0;
    position: absolute;
  }

  &_sending {
    cursor: wait;
  }

  &_sending &__status {
    transform-origin: 12px 12.5px;
    animation: ui-async-status-sending 1s infinite cubic-bezier(0.34, 1.56, 0.64, 1)
  }
}

label > .ui-async-status {
  position: absolute;
  right: 12px;
  top: 8px;
  color: var(--surface-border-a-static);
}

label:focus-within > .ui-async-status {
  color: var(--primary-color);
}

label > .ui-async-status {
  &.ui-async-status_error, &.ui-async-status_invalid {
    color: var(--error);
  }
}


@keyframes ui-async-status-sending {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>