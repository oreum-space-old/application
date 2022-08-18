<template>
  <ui-card class="app-header-user">
    <div class="app-header-user__info">
      <span class="app-header-user__username">
        {{ user.username }}
      </span>
      <span class="app-header-user__currency">
        {{ user.id }}
      </span>
    </div>
    <img
      width="48"
      :src="avatar"
      alt="avatar"
    >
  </ui-card>
</template>

<script
  setup
  lang="ts"
>
import UiCard from '@/components/ui/UiCard.vue'
import useUser from '@/stores/user'
import avatar from '@/assets/temp/avatar.png'

const user = useUser()
</script>

<style
  lang="scss"
>
.app-header-user {
  &.card {
    flex-flow: row;
    align-items: center;
    margin-left: auto;
    padding-block: 4px;
  }

  &:hover {
    background-color: var(--surface-overlay);
  }

  &__info {
    display: flex;
    flex-flow: column;
  }
}
</style>
