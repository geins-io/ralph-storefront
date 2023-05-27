<template>
  <component
    :is="isDesktop"
    v-if="modifiedCategories.length"
    class="ca-category-display__container"
  >
    <ul class="ca-category-display">
      <li
        v-for="(category, index) in modifiedCategories"
        :key="index"
        class="ca-category-display__item"
      >
        <CaButton
          class="ca-category-display__button"
          :href="category.canonicalUrl"
          :color="buttonColor"
          size="s"
        >
          {{ category.name }}
        </CaButton>
      </li>
    </ul>
  </component>
</template>
<script>
import MixSaleUtils from 'MixSaleUtils';
// @group Molecules
// @vuese
// Display list of categories as buttons. Often used in list page headers<br><br>
// **SASS-path:** _./styles/components/molecules/ca-category-display.scss_
export default {
  name: 'CaCategoryDisplay',
  mixins: [MixSaleUtils],
  props: {
    // List of categories to display. Must include name and alias
    categories: {
      type: Array,
      required: true
    },
    // The color of the button. See documentation for [CaButton](/components/CaButton) to learn more.
    buttonColor: {
      type: String,
      default: 'primary'
    },
    // HTML tag for wrapper
    elementWrapper: {
      type: String,
      default: 'div'
    }
  },
  data: () => ({}),
  computed: {
    isDesktop() {
      return this.$store.getters.viewportComputer
        ? 'CaReadMore'
        : this.elementWrapper;
    },
    modifiedCategories() {
      if (!this.isSale) {
        return this.categories;
      } else {
        const modifiedCategories = this.categories.map(category => {
          const modifiedPath = this.addSaleToPath(category.canonicalUrl);

          return {
            ...category,
            canonicalUrl: modifiedPath
          };
        });

        return modifiedCategories;
      }
    }
  },
  watch: {},
  methods: {
    addSaleToPath(path) {
      if (/^\/l/.test(path)) {
        return path.replace(/^\/l/, '/l' + this.salePath);
      }

      return path;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-category-display';
</style>
