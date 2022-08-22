<template>
  <ui-h
    id="inputs"
    level="2"
    class="mb2"
  >
    Inputs
  </ui-h>
  <ui-card class="pv6">
    <ui-h
      id="inputs-input-text"
      level="3"
      class="mb2"
    >
      Input Text
    </ui-h>
    <ui-input-text
      label="Default"
      model-value=""
    />
    <ui-input-text
      label="Disabled"
      model-value=""
      disabled
    />
    <ui-input-text
      label="Invalid"
      model-value=""
      invalid
    />
    <ui-h
      id="inputs-group"
      level="3"
      class="mb2 mt4"
    >
      Input group
    </ui-h>
    <ui-input-group>
      <ui-input-text
        label="Input group 1"
        model-value=""
      />
      <ui-input-text
        label="Input group 2"
        model-value=""
      />
      <ui-input-text
        label="Input group 3"
        model-value=""
      />
    </ui-input-group>
    <ui-h
      id="inputs-group"
      level="3"
      class="mb2 mt4"
    >
      Input group
    </ui-h>
    <ui-input-group>
      <ui-input-textarea
        label="Input TextArea"
        model-value=""
      />
    </ui-input-group>
  </ui-card>
  <ui-card class="pv6">
    <ui-h
      id="inputs-input-text"
      level="3"
      class="mb2"
    >
      Input Text
    </ui-h>
    <ui-input-radio-group-fruits
      :model-value="radioFruitsValue"
      :options="radioFruits"
      @update:model-value="radioFruitsValue = $event"
    />
    <ui-input-radio-group-city
      :model-value="radioCityValue"
      :options="radioCities"
      options-key="cityKey"
      options-text-key="cityText"
      column
      @update:model-value="radioCityValue = $event"
    />
    <div class="flex-row gap4">
      <ui-input-check-box
        v-model="checkboxDiamond"
        label="Diamond"
      />
      <ui-input-check-box
        v-model="checkboxEmerald"
        label="Emerald"
      />
      <ui-input-check-box
        v-model="checkboxPeridot"
        label="Peridot"
      />
    </div>
  </ui-card>
  <ui-card class="pv6">
    <ui-h
      id="inputs-input-text"
      level="3"
      class="mb2"
    >
      Color Picker
    </ui-h>
    <ui-input-color
      v-if="false"
      :model-value="color"
    />
<!--    <ui-input-color
      :model-value="colorOrange"
    />
    <ui-input-color
      :model-value="colorGray"
    />-->
    <div class="flex-row gap8">
      <ui-card>
        <div
          style="width: 24px; height: 24px; background: coral; position: relative"
        >
          <div
            id="test"
            v-over:[setTest].parent-toggle="test"
            style="width: 64px; height: 64px; background: darkcyan;"
          />
        </div>
      </ui-card>
      <div
        style="width: 24px; height: 24px; background: salmon; position: relative "
      >
        <div
          id="parent"
          v-over.parent
          style="width: 24px; height: 24px; background: forestgreen; position: absolute; top: 100%"
        />
      </div>
      <div
        style="width: 24px; height: 24px; background: coral; position: relative"
      >
        <div
          id="previous"
          v-over.previous
          style="width: 24px; height: 24px; background: darkcyan; position: absolute; top: 100%"
        />
      </div>
    </div>
  </ui-card>
</template>

<script
  setup
  lang="ts"
>
import UiInputCheckBox from '@/components/ui/input/UiInputCheckBox.vue'
import UiInputColor from '@/components/ui/input/UiInputColor.vue'
import { ref } from 'vue'
import UiInputGroup from '@/components/ui/input/UiInputGroup.vue'
import UiInputText from '@/components/ui/input/UiInputText.vue'
import UiInputTextarea from '@/components/ui/input/UiInputTextarea.vue'
import UiCard from '@/components/ui/UiCard.vue'
import UiH from '@/components/ui/UiH.vue'
import UiInputRadioGroupDefault, {
  GenericUiInputRadioGroup,
} from '@/components/ui/input/UiInputRadioGroup.vue'

// Radio Buttons
const radioFruits = ['Apple', 'Banana', 'Coconut', 'Dewberries'] as const
type RadioFruits = typeof radioFruits[number]
const UiInputRadioGroupFruits = UiInputRadioGroupDefault as GenericUiInputRadioGroup<RadioFruits>
const radioFruitsValue = ref<RadioFruits>(radioFruits[0])

const test = ref(false)
const setTest = (v: boolean) => test.value = v

// Radio Buttons Cities
const radioCities: Array<Record<string, string | number>> = [
  {
    cityText: 'Kazan',
    cityKey: 'kazan'
  },
  {
    cityText: 'Moscow',
    cityKey: 'moscow'
  },
  {
    cityText: 'Saint-Petersburg',
    cityKey: 'saintPetersburg'
  }
]
type RadioCity = typeof radioCities[number]
const UiInputRadioGroupCity = UiInputRadioGroupDefault as GenericUiInputRadioGroup<RadioCity>
const radioCityValue = ref<typeof radioCities[number]>(radioCities[0])

// CheckBoxes
const
  checkboxDiamond = ref<boolean>(false),
  checkboxEmerald = ref<boolean>(true),
  checkboxPeridot = ref<boolean>(false)

// Color
const
  color = ref<number>(0xffffff),
  colorOrange = ref<number>(0xE57737),
  colorGray = ref<number>(0x888888)
</script>

<style
  lang="scss"
  scoped
>

</style>
