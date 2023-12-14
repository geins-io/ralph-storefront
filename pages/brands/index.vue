<template>
  <div class="ca-brands-page">
    <CaContainer>
      <h1 class="ca-brands-page__title">{{ $t('BRANDS_TITLE') }}</h1>
      <div v-if="brands && brands.length > 0" class="ca-brands-page__content">
        <ul class="ca-brands-page__filter">
          <li
            v-for="(brandGroup, index) in brandsTree"
            :key="index"
            :class="{
              'ca-brands-page__filter-item--active':
                brandGroup.group === activeGroupFilter,
              'ca-brands-page__filter-item--passive':
                brandGroup.group != activeGroupFilter && isGroupFilter,
            }"
            class="ca-brands-page__filter-item"
          >
            <CaClickable @clicked="setGroupFilter(brandGroup.group)">
              {{ brandGroup.group }}
            </CaClickable>
          </li>
        </ul>
        <button
          v-if="activeGroupFilter"
          class="ca-brands-page__reset"
          @click="setGroupFilter(activeGroupFilter)"
        >
          {{ $t('RESET_FILTERS') }}
        </button>
        <ul class="ca-brands-page__group">
          <li
            v-for="(brandGroup, index) in brandsTree"
            :key="index"
            :aria-hidden="[
              brandGroup.group != activeGroupFilter && isGroupFilter,
            ]"
            class="ca-brands-page__group-item"
          >
            <span class="ca-brands-page__group-label">{{
              brandGroup.group
            }}</span>
            <ul class="ca-brands-page__list">
              <li
                v-for="(brand, i) in brandGroup.brands"
                :key="i"
                class="ca-brands-page__list-item"
              >
                <NuxtLink class="ca-brands-page__link" :to="brand.canonicalUrl">
                  {{ brand.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <p v-else class="ca-brands-page__empty">
        {{ $t('BRANDS_EMPTY') }}
      </p>
    </CaContainer>
  </div>
</template>

<script>
import MixBrandsPage from 'MixBrandsPage';
/*
  Renders the brands page.
*/
export default {
  name: 'BrandsPage',
  mixins: [MixBrandsPage],
  data: () => ({}),
  computed: {},
  watch: {},
  methods: {},
  meta: {
    pageType: 'Brands Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/brands-page';
</style>
