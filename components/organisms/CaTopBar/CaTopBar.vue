<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container">
      <div class="ca-usp-block ca-top-bar__usps">
        <div class="ca-top-bar__usp">{{ $t('USP_TEXT') }}</div>
      </div>
      <CaMarketSelectorButton
        v-show="!undistracted"
        class="ca-top-bar__lang-switcher only-computer"
      />
    </CaContainer>
  </div>
</template>
<script>
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false
    }
  },
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
@import 'organisms/ca-top-bar';
</style>
