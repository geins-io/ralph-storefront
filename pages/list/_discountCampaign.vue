<template>
  <CaListPage
    type="discountCampaign"
    :info-query="infoQuery"
    :current-alias="currentAlias"
    :filters-vars="filtersVars"
  />
</template>

<script>
/*
  Renders the discount campaign page.
  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the discount campaign.
    filtersVars: The variables for the filters query.

*/
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
  }
};
</script>
