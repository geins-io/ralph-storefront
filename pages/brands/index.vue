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
              'is-active': brandGroup.group === activeGroupFilter,
              'is-passive':
                brandGroup.group != activeGroupFilter && isGroupFilter
            }"
            class="ca-brands-page__filter-item"
          >
            <CaClickable @clicked="setGroupFilter(brandGroup.group)">
              {{ brandGroup.group }}
            </CaClickable>
          </li>
        </ul>
        <ul class="ca-brands-page__group">
          <li
            v-for="(brandGroup, index) in brandsTree"
            :key="index"
            :aria-hidden="[
              brandGroup.group != activeGroupFilter && isGroupFilter
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
/*
  Renders the brands page.

  apollo:
    brands: The brands query.
    errorPolicy: 'all' to prevent errors from being thrown.
    result: If the brands query returns data, set isLoading to false.
    error: If the brands query returns an error, throw the error.
  
  data:
    isLoading: Boolean to check if the brands query has returned data.
    brandsTree: The brands object.
    isGroupFilter: Boolean to check if the group filter is active.
    activeGroupFilter: The active group filter.
  
  computed:
    sortedBrands: The brands sorted by alias.
    getOneBrandPerCharacter: The brands sorted by alias and only one brand per character.

  methods:
    setGroupFilter: Sets the active group filter.

  watch:
    sortedBrands: If the brands query returns data, set the brandsTree to the getOneBrandPerCharacter.

*/
import brandsByProductsQuery from 'products/brands-by-products.graphql';
export default {
  name: 'BrandsPage',
  apollo: {
    products: {
      query: brandsByProductsQuery,
      errorPolicy: 'all',
      result(result) {
        if (result.data && result.data.products.filters) {
          const facets = result.data.products.filters.facets;
          const brandFacets = facets.find(facet => facet.type === 'Brand'); 

          this.updateBrandsFromFacets(brandFacets);
          this.isLoading = false;
        }

        this.$store.dispatch('loading/end');
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  data: () => ({
    brands: [],
    isLoading: true,
    brandsTree: [],
    isGroupFilter: false,
    activeGroupFilter: ''
  }),
  computed: {
    sortedBrands() {
      const getBrands = [...this.brands];

      return getBrands.sort((a, b) => {
        const aliasA = a.alias;
        const aliasB = b.alias;

        if (aliasA < aliasB) {
          return -1;
        }
        if (aliasA > aliasB) {
          return 1;
        }

        return 0;
      });
    },
    getOneBrandPerCharacter() {
      const getBrands = [...this.sortedBrands];

      return getBrands.filter((item, index, array) => {
        const a = item.alias.substring(0, 1);
        const b = array[index + 1]?.alias.substring(0, 1);

        return a !== b;
      });
    },
    getAllInitialCharacters() {
      const brands = [...this.getOneBrandPerCharacter];

      return brands.map(item => item.alias.substring(0, 1));
    }
  },
  watch: {
    isLoading() {
      if (!this.isLoading) {
        this.createBrandsTree();
      }
    }
  },
  methods: {
    updateBrandsFromFacets(facets) {
      if (facets && facets.values.length) {
        this.brands = [...facets.values].map(item => {
          return {
            alias: item.label.toUpperCase(),
            name: item.label,
            canonicalUrl: item.url
          }
        });
      }
    },
    getAllBrandsByInitial(character) {
      const getBrands = [...this.sortedBrands];

      return getBrands.filter(item => item.alias.substring(0, 1) === character);
    },
    createBrandsTree() {
      const initialCharacters = this.getAllInitialCharacters;

      initialCharacters.forEach(character => {
        this.brandsTree.push({
          group: character,
          brands: this.getAllBrandsByInitial(character)
        });
      });
    },
    setGroupFilter(group) {
      this.isGroupFilter = true;

      if (this.activeGroupFilter === group) {
        this.activeGroupFilter = '';
        this.isGroupFilter = false;
        return;
      }

      this.activeGroupFilter = group;
    }
  },
  meta: {
    pageType: 'Brands Page'
  }
};
</script>

<style lang="scss">
@import './styles/pages/brands-page';
</style>
