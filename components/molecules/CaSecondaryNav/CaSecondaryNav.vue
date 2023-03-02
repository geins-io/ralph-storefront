<template>
  <ul class="ca-secondary-nav">
    <li class="ca-secondary-nav__item">
      <button
        v-if="!$store.getters['auth/authenticated']"
        type="button"
        class="ca-secondary-nav__account"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login'
          })
        "
      >
        <CaIconAndText class="ca-secondary-nav__account-text" icon-name="user">
          {{ $t('ACCOUNT_TITLE') }}
        </CaIconAndText>
      </button>
      <NuxtLink
        v-else
        class="ca-secondary-nav__account"
        :to="$getPath('account-orders')"
      >
        <CaIconAndText class="ca-secondary-nav__account-text" icon-name="user">
          {{ $t('ACCOUNT_TITLE') }}
        </CaIconAndText>
      </NuxtLink>
    </li>
    <li class="ca-secondary-nav__item ca-secondary-nav__item--icon">
      <CaFavorites class="ca-secondary-nav__favorites" />
    </li>
    <li class="ca-secondary-nav__item ca-secondary-nav__item--icon">
      <CaMiniCart class="ca-secondary-nav__cart" />
    </li>
  </ul>
</template>
<script>
/*
  CaSecondaryNav is a reusable component that displays the links in the bottom of the mobile menu
*/
export default {
  name: 'CaSecondaryNav',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-secondary-nav';
</style>
