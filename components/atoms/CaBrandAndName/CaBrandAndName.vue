<template>
  <div class="ca-brand-and-name">
    <div v-if="brand !== ''" class="ca-brand-and-name__brand">
      <NuxtLink
        v-if="brandAlias !== ''"
        class="ca-brand-and-name__brand-link"
        :to="brandAlias"
      >
        {{ brand }}
      </NuxtLink>
      <span v-else>
        {{ brand }}
      </span>
    </div>
    <component :is="nameTag" class="ca-brand-and-name__name">
      {{ name }}
    </component>
  </div>
</template>
<script>
/*
  CaBrandAndName is a reusable component that displays a brand name and a product name.
  It receives four props:
  - brand: a string representing the brand name
  - brandAlias: a string representing the canconical for the brand. If provided the brand name will be linked
  - name: a required string representing the product name
  - nameTag: a string representing the HTML tag to use when rendering the product name (defaults to 'h2')
*/
export default {
  name: 'CaBrandAndName',
  mixins: [],
  props: {
    brand: {
      type: String,
      default: ''
    },
    brandAlias: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    nameTag: {
      type: String,
      default: 'h2'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-brand-and-name';
</style>
