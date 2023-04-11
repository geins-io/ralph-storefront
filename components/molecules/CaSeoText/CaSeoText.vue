<template>
  <div v-if="text" class="ca-seo-text">
    <div class="ca-seo-text__inner" :class="{ collapsed: isCollapsed }">
      <CaHtml class="ca-seo-text__content" :content="text" />
    </div>
    <button class="ca-seo-text__button" @click="toggle">
      {{ toggleButtonText }}
    </button>
  </div>
</template>
<script>
/* 
  This is a component for displaying SEO text content
*/
export default {
  name: 'CaSeoText',
  mixins: [],
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isCollapsed: true
  }),
  computed: {
    toggleButtonText() {
      return this.isCollapsed ? this.$t('SEO_READ_MORE') : this.$t('SEO_READ_LESS');
    },
  },
  watch: {},
  mounted() {},
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-seo-text';
</style>
