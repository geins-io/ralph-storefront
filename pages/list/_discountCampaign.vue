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
 
 middleware: ralph-list-page-routing - handles the routing for the list pages
  
  computed:
    currentAlias: The current alias of the discount campaign.

*/
import MixListInfo from 'MixListInfo';
export default {
  name: 'DiscountCampaignListView',
  mixins: [MixListInfo],
  middleware: 'ralph-list-page-routing',
  data: () => ({
    listType: 'discountCampaign',
  }),
  computed: {
    currentAlias() {
      return this.$route.params.discountCampaign.split('/').pop();
    },
  },
  mounted() {},
  methods: {},
  meta: {
    pageType: 'Discount Campaign Page',
  },
};
</script>
