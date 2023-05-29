<template>
  <CaContainer class="ca-instashop-page">
    <client-only>
      <header class="ca-instashop-page__header">
        <h1 class="ca-instashop-page__title">{{ $t('FLOWBOX_PAGE_TITLE') }}</h1>
        <p class="ca-instashop-page__hashtag">{{ $t('FLOWBOX_HASHTAG') }}</p>
        <ul class="ca-instashop-page__filters">
          <li v-for="tag in buttons" :key="tag">
            <button
              :data-tag="tag"
              class="ca-instashop-page__filters-button"
              :class="{
                'ca-instashop-page__filters-button--selected':
                  tag === selectedTag
              }"
              @click="onTagClick"
            >
              {{ getTagText(tag) }}
            </button>
          </li>
        </ul>
      </header>
      <div ref="flow" class="flow-container"></div>
    </client-only>
  </CaContainer>
</template>

<script>
/* eslint no-console: ["warn", { allow: ["error"] }] */
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
  mounted() {},
  beforeDestroy() {
    try {
      window.flowbox('destroy', {
        container: this.$refs.flow
      });
    } catch (err) {
      console.error('flow-destroy', err);
    }
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
      try {
        if (!window?.flowbox) {
          const f = function() {
            f.q.push(arguments);
          };
          f.q = [];
          window.flowbox = f;
        }
        window.flowbox('init', {
          container: this.$refs.flow,
          key: this.flowKey,
          locale: this.$i18n?.localeProperties.code,
          tags: this.tags,
          tagsOperator: 'any',
          lazyLoad: false
        });
      } catch (err) {
        console.error('flow-init', err);
      }

      this.$store.dispatch('loading/end');
    },
    updateFlow(tags) {
      try {
        window.flowbox('update', {
          container: this.$refs.flow,
          key: this.flowKey,
          tags
        });
      } catch (err) {
        console.error('flow-update', err);
      }
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'flowbox-js-embed',
          src: 'https://connect.getflowbox.com/flowbox.js',
          defer: true,
          callback: () => {
            this.$nextTick(() => {
              this.initFlow();
            });
          }
        }
      ]
    };
  },
  meta: {
    pageType: 'Instashop'
  }
};
</script>
<style lang="scss">
@import './styles/pages/instashop-page';
</style>
