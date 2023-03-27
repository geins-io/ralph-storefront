<template>
  <span class="ca-badge" :class="modifiers">{{ text }}</span>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaBadge',
  mixins: [],
  props: {
    value: {
      type: String,
      default: '',
      required: true
    }
  },
  data: () => ({}),
  computed: {
    text() {
      if(this.isKnownBadge) {
        return this.$t(this.translationKey);
      }

      return this.value;
    },
    modifiers() {
      if(this.isKnownBadge) {
        return 'ca-badge--' + this.value.toLowerCase();
      }

      return '';
    },
    translationKey() {
      return `BADGE_${this.value}`;
    },
    isKnownBadge() {
      return this.$te(this.translationKey);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-badge';
</style>
