<template>
  <CaListPage
    type="discountCampaign"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :base-filters="baseFilters"
  />
</template>

<script>
import discountCampaignInfoQuery from 'productlist/discountCampaign-page.graphql';
import filtersQuery from 'productlist/products-filter.graphql';

export default {
  name: 'DiscountCampaignListView',
  mixins: [],
  apollo: {
    products: {
      query() {
        return filtersQuery;
      },
      variables() {
        return {
          discountCampaignAlias: this.currentAlias,
          filter: null
        };
      },
      result(result) {
        if (result.data.products.filters.facets.length > 0) {
          this.baseFilters = result.data.products.filters;
        } else if (!process.server) {
          this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
          this.$store.dispatch('redirect404');
        }
      },
      skip() {
        return this.filtersLoaded;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    infoQuery: discountCampaignInfoQuery,
    baseFilters: {}
  }),
  computed: {
    currentAlias() {
      return this.$route.params.discountCampaign.split('/').pop();
    },
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    }
  },
  mounted() {},
  methods: {}
};
</script>
