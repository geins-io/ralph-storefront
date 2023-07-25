<template>
  <CaListPage
    :type="listType"
    :list-info="listInfo"
    :current-alias="currentAlias"
  />
</template>

<script>
/*
  Renders the discount campaign page.
  middleware: list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the discount campaign.

*/
import MixListInfo from 'MixListInfo';
export default {
  middleware: 'list-page-routing',
  name: 'DiscountCampaignListView',
  mixins: [MixListInfo],
  data: () => ({
    listType: 'discountCampaign'
  }),
  computed: {
    currentAlias() {
      return this.$route.params.discountCampaign.split('/').pop();
    }
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Discount Campaign Page'
  }
};
</script>
