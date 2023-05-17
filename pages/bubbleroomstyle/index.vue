<template>
  <CaContainer class="ca-instashop-page">
    <header class="ca-instashop-page__header">
      <h1 class="ca-instashop-page__title">{{ $t('FLOWBOX_PAGE_TITLE') }}</h1>
      <p class="ca-instashop-page__hashtag">{{ $t('FLOWBOX_HASHTAG') }}</p>
      <ul class="ca-instashop-page__filters">
        <li v-for="tag in buttons" :key="tag">
          <button
            :data-tag="tag"
            class="ca-instashop-page__filters-button"
            :class="{
              'ca-instashop-page__filters-button--selected': tag === selectedTag
            }"
            @click="onTagClick"
          >
            {{ getTagText(tag) }}
          </button>
        </li>
      </ul>
    </header>
    <div ref="flow" class="flow-container"></div>
  </CaContainer>
</template>

<script>
export default {
  name: 'InstashopPage',
  data: () => ({
    tags: ['dresses', 'jumpsuits', 'tops', 'jackets', 'trousers-skirts'],
    selectedTag: 'all',
    flowKey: 'a6IuB9-NRp6bSncRCy3GaA'
  }),
  computed: {
    buttons() {
      return ['all', ...this.tags];
    }
  },
  watch: {},
  mounted() {
    if (!window?.flowbox) {
      const f = function() {
        f.q.push(arguments);
      };
      f.q = [];
      window.flowbox = f;
    }
    this.initFlow();
  },
  methods: {
    getTagText(tag) {
      return this.$t(`FLOWBOX_TAG_${tag.replace('-', '_').toUpperCase()}`);
    },
    onTagClick(e) {
      const selectedTag = e.currentTarget.dataset.tag; 
      const tags = selectedTag === 'all' ? this.tags : [selectedTag];

      this.updateFlow(tags);
      this.selectedTag = selectedTag;
    },
    initFlow() {
       window.flowbox('init', {
        container: this.$refs.flow,
        key: this.flowKey,
        locale: this.$i18n?.localeProperties.code,
        tags: this.tags,
        tagsOperator: 'any',
        lazyLoad: false
      });
    },
    updateFlow(tags) {
      window.flowbox('update', {
        key: this.flowKey,
        tags
      });
    }
  },
  head() {
    return {
      script: [
        {
          // unique id for script
          hid: 'flowbox-js-embed',
          src: 'https://connect.getflowbox.com/flowbox.js',
          defer: true
        }
      ]
    };
  },
  meta: {
    pageType: 'Instashop Page'
  }
};
</script>
<style lang="scss">
@import './styles/pages/instashop-page';
</style>
