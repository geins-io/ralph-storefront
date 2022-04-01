<template>
  <CaListPage
    type="discountCampaign"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
import discountCampaignInfoQuery from 'productlist/discountCampaign-page.graphql';

export default {
  middleware: 'list-page-routing',
  name: 'DiscountCampaignListView',
  mixins: [],
  data: () => ({
    infoQuery: discountCampaignInfoQuery
  }),
  computed: {
    currentAlias() {
      return this.$route.params.discountCampaign.split('/').pop();
    },
    filtersVars() {
      return {
        discountCampaignAlias: this.currentAlias,
        filter: null
      };
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Discount Campaign Page'
  },
};
</script>
