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
      <NuxtLink v-else :to="localePath('account-orders')">
        {{ $t('ACCOUNT_TITLE') }}
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <NuxtLink :to="localePath('favorites')">
        {{ $t('FAVORITES_LABEL') }} ({{ $store.state.favorites.length }})
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <CaCountrySelectorPanel />
    </CaSecondaryNavItem>
    <!-- <CaSecondaryNavItem>
      <a
        v-for="locale in availableLocales"
        :key="locale.code"
        :href="$i18n.defaultLocale === locale.code ? '/' : '/' + locale.code"
      >
        <CaFlag
          class="ca-top-bar__flag"
          :country="locale.flag"
          shape="circle"
        />
        {{ locale.name }}
      </a>
    </CaSecondaryNavItem> -->
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
