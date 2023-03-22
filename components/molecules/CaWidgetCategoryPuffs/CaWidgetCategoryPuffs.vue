<template>
  <section class="ca-widget-category-puffs">
    <h2
      v-if="configuration.active && configuration.heading"
      class="ca-widget-category-puffs__heading"
    >
      {{ configuration.heading }}
    </h2>
    <ul
      v-if="
        configuration.active &&
          configuration.images &&
          configuration.images.length
      "
      class="ca-widget-category-puffs__list"
    >
      <li
        v-for="(image, index) in configuration.images"
        :key="'category-image-' + index"
        class="ca-widget-category-puffs__list-item"
      >
        <NuxtLink :to="$getPath(image.href)">
          <CaImage
            :filename="getImageFilename(image)"
            type="pagewidget"
            :alt="image.altText"
            :ratio="1"
            sizes="(min-width: 768px) 190px, 140px"
            class="ca-widget-category-puffs__image"
          />
          <h3
            v-if="image.title"
            :style="textStyles"
            class="ca-widget-category-puffs__category-title"
          >
            {{ image.title }}
          </h3>
          <p
            v-if="image.text"
            :style="textStyles"
            class="ca-widget-category-puffs__category-subtitle"
          >
            {{ image.text }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script>
// @group Molecules
// @vuese
// Category Puffs widget handler component<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-category-puffs.scss_
export default {
  name: 'CaWidgetCategoryPuffs',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    },
    // Sizes attribute for widget image
    imageSizes: {
      type: String,
      required: true
    },
    // Image ratios
    imageRatios: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    textStyles() {
      return {
        lineHeight: `${this.customLineHeight}`,
        paddingTop: `${this.customPadding}`,
        textDecoration: this.configuration.isUnderline
          ? 'underline'
          : 'initial',
        textTransform: this.configuration.isUppercase ? 'uppercase' : 'initial'
      };
    },
    customPadding() {
      const values = [0.25, 0.5, 0.75];
      const index = this.configuration?.padding ?? 0;

      return `${values[index]}rem`;
    },
    customLineHeight() {
      const values = [1, 1.25, 1.5];
      const index = this.configuration?.lineHeight ?? 0;

      return `${values[index]}`;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Method to get filename
    getImageFilename(image) {
      const filenamePhone = image.filenameForMobileDevice
        ? image.filenameForMobileDevice
        : image.filename;
      const filenameTabletUp = image.filename
        ? image.filename
        : image.filenameForMobileDevice;
      return this.$store.getters.viewport === 'phone'
        ? filenamePhone
        : filenameTabletUp;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-category-puffs';
</style>
