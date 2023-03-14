<template>
  <div class="ca-top-bar" :class="modifiers">
    <CaContainer class="ca-top-bar__container" design="none">
      <div class="ca-usp-block ca-top-bar__usps">
        <div class="ca-top-bar__usp">{{ $t('USP_TEXT') }}</div>
      </div>
    </CaContainer>
  </div>
</template>
<script>
/*
  A top bar component that is used on all pages.

  props:
    undistracted: Boolean
      If true, this is used by rthe undistrected layout and some elements might want to be hidden
*/
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
    modifiers() {
      return {
        'ca-top-bar--scrolled': !this.$store.getters.siteIsAtTop,
        'ca-top-bar--undistracted': this.undistracted
      };
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
