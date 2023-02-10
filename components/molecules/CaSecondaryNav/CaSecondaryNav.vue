<template>
  <ul class="ca-secondary-nav">
    <CaSecondaryNavItem>
      <button
        v-if="!$store.getters['auth/authenticated']"
        type="button"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login'
          })
        "
      >
        {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
      </button>
      <NuxtLink v-else :to="$getPath('account-orders')">
        {{ $t('ACCOUNT_TITLE') }}
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <NuxtLink :to="$getPath('favorites')">
        {{ $t('FAVORITES_LABEL') }} ({{ $store.state.favorites.length }})
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <CaCountrySelectorPanel />
    </CaSecondaryNavItem>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaSecondaryNav',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-secondary-nav';
</style>
