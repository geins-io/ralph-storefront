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
    type: {
      type: String,
      default: 'text'
    },
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return 'ca-badge--' + this.type.toLowerCase();
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
