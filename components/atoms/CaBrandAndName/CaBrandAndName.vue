<template>
  <div class="ca-brand-and-name">
    <div v-if="brand !== ''" class="ca-brand-and-name__brand">
      <NuxtLink
        v-if="brandAlias !== ''"
        class="ca-brand-and-name__brand-link"
        :to="'/b/' + brandAlias"
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
.ca-brand-and-name {
  &__brand {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    margin-bottom: $px4;
  }
}
</style>
