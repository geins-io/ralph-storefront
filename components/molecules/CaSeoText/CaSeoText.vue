<template>
  <div v-if="content" class="ca-seo-text">
    <div class="ca-seo-text__inner" :class="{ collapsed: isCollapsed }">
      <CaHtml class="ca-seo-text__content" :content="content" />
    </div>
    <button class="ca-seo-text__button" @click="toggle">
      {{ toggleButtonText }}
    </button>
  </div>
</template>
<script>
import MixSaleUtils from 'MixSaleUtils';

/* 
  This is a component for displaying SEO text content
*/
export default {
  name: 'CaSeoText',
  mixins: [MixSaleUtils],
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
    content() {
      const text = this.textVariation(this.text);

      return this.trimBrTags(text);
    }
  },
  watch: {},
  mounted() {},
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed;
    },
    trimBrTags(str) {
      if (typeof str !== 'string') {
        return str;
      }

      const brTags = /^(\s*<br\s*\/?\s*>\s*)*|(\s*<br\s*\/?\s*>\s*)*\s*$/g;

      return str.replace(brTags, '');
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-seo-text';
</style>
