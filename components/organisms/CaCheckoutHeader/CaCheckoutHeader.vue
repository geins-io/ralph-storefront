<template>
  <div class="ca-checkout-header">
    <CaIconButton
      class="ca-checkout-header__back"
      :href="$getPath('index')"
      :icon-name="iconName"
      :aria-label="$t('CONTINUE_SHOPPING')"
    />
    <NuxtLink :to="$getPath('index')">
      <CaLogo class="ca-checkout-header__logo" alt="Logo" />
    </NuxtLink>
    <h1 class="ca-checkout-header__title">{{ title }}</h1>
  </div>
</template>
<script>
// @group Organisms
// @vuese
// The header of the checkout containing logo, title and a button to go back<br><br>
// **SASS-path:** _./styles/components/organisms/ca-checkout-header.scss_
export default {
  name: 'CaCheckoutHeader',
  mixins: [],
  props: {
    // Title of the page
    title: {
      type: String,
      required: true
    },
    // The icon name. See documentation for [CaIcon](/components/CaIcon) to learn more.
    iconName: {
      type: String,
      default: 'arrow-left'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-checkout-header';
</style>
