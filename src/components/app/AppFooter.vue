<template>
  <footer
    id="footer"
    class="footer"
  >
    <section class="flex-row-wrap justify-between w100 small">
      <div class="flex footer__block">
        <router-link to="/unknown">
          Discord
        </router-link>
        <router-link to="/unknown">
          Client
        </router-link>
        <router-link to="/unknown">
          Contacts
        </router-link>
      </div>
      <div class="flex footer__block">
        <router-link to="/unknown">
          Status
        </router-link>
        <router-link to="/unknown">
          About
        </router-link>
      </div>
      <div class="flex footer__block">
        <router-link to="/unknown">
          Terms
        </router-link>
        <router-link to="/unknown">
          Privacy
        </router-link>
        <router-link to="/unknown">
          Security
        </router-link>
      </div>
    </section>
    <section class="flex-row justify-end">
      <ui-select
        v-model="language"
        class="small"
        :options="languages"
      >
        <template #selected="{ selected }">
          <div class="ui-select__selected ui-select__selected_has flex-row w100 aling-center">
            <ui-flag
              v-if="selected"
              :flag="lang.langs[selected.value].flag"
              class="ui-flag_small"
            />
            <span>
              {{ selected?.display }}
            </span>
          </div>
        </template>
        <template #option="{ option }">
          <div class="flex-row w100 aling-center">
            <ui-flag
              v-if="option"
              :flag="lang.langs[option.value].flag"
              class="ui-flag_small"
            />
            <span>
              {{ option?.display }}
            </span>
          </div>
        </template>
      </ui-select>
    </section>
  </footer>
</template>

<script
  setup
  lang="ts"
>
import UiFlag from '@/components/ui/UiFlag.vue'
import UiSelect, { UiSelectValue } from '@/components/ui/UiSelect.vue'
import useLang from '@/stores/lang'
import { computed } from 'vue'

const
  lang = useLang(),
  language = computed<UiSelectValue>({
    get () {
      return {
        display: lang.lang.name,
        value: lang.lang.id
      }
    },
    set (value) {
      lang.loadLang(value.value)
    }
  }),
  languages = Object.values(lang.langs).map(_ => ({ display: _.name, value: _.id }))
</script>

<style lang="scss">
.footer__block {
  min-width: 240px;
}
</style>
