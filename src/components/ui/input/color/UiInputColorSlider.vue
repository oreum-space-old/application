<template>
  <div class="ui-input-color-slider">
    <span
      class="ui-input-color-slider__label"
    >
    </span>
    <span
      contenteditable="true"
      class="ui-input-color-slider__value"
    >

    </span>
  </div>
</template>

<script
  setup
  lang="ts"
>

</script>

<style
  lang="scss"
  scoped
>
.ui-color-picker {
  max-width: fit-content;
  max-height: fit-content;

  &__button {
    display: flex;
    text-align: center;
    width: 96px;
    border-width: 1px;
    border-style: solid;
    outline: solid 2px;
    outline-offset: -2px;

    &:not(:hover):not(:focus) {
      outline-color: transparent !important;
    }
  }

  &__popover {
    display: flex;
    flex-flow: column;
    padding: 24px;
    background-color: var(--surface-overlay);
    box-shadow: var(--surface-overlay-shadow);
    border-radius: 12px;
    gap: 16px;
    z-index: 1;
    user-select: none;
    -webkit-user-drag: none;

    @media (min-height: 768px) and (min-width: 768px) {
      flex-flow: row;
    }

    .ui-input {
      width: 256px;
    }
  }

  &__picker {
    position: relative;
    width: 256px;
    height: 256px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
    linear-gradient(90deg, #FFFFFF 0%, rgba(0, 0, 0, 0) 100%, rgba(255, 255, 255, 0) 100%), #FF5E00;
  }

  &__form {
    display: flex;
    flex-flow: column;
    gap: 8px;
  }

  &__pointer {
    position: absolute;
    width: 11px;
    height: 11px;
    border-radius: 5px;
    border: 1px solid var(--color);
    transform: translate(-5px, 5px);
    transition: border-color ease-in-out 0.25s;

    &::after {
      content: ' ';
      display: block;
      left: 4px;
      top: 4px;
      position: relative;
      width: 1px;
      height: 1px;
      background-color: var(--color);
      border-radius: 1px;
      transition: background-color ease-in-out 0.25s;
    }
  }
}
</style>