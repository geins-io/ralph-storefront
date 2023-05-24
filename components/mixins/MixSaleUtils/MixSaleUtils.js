/*
  Helpers for sale pages
*/
import { mapState } from 'vuex';

export default {
  name: 'MixSaleUtils',
  computed: {
    ...mapState({
      currentMarket: state => state.channel.currentMarket
    }),
    // @vuese
    // Get sale paths by market dictionary
    salePathsByMarket() {
      if (!this.$config?.salePathsByMarket) {
        return {};
      }

      return this.$config.salePathsByMarket;
    },
    // @vuese
    // Get sale path by market
    salePath() {
      return this.salePathsByMarket[this.currentMarket];
    },
    // @vuese
    // Check if current route includes sale segment
    isSale() {
      if (!this.$route?.path) {
        return false;
      }

      const salePaths = Object.values(this.salePathsByMarket);

      return salePaths.some(x => this.$route.path.includes(x));
    },
    // @vuese
    // Compute sale facet name
    saleFacet() {
      const facet = 'rp_sale_';
      const currency = this.$store.getters['channel/currentCurrency'];

      return `${facet}${currency}`.toLowerCase();
    },
  },
  methods: {
    // @vuese
    // Get standard or sale text, depending on isSale
    // @arg text (String)
    textVariation(text) {
      if (typeof text !== 'string') {
        return text;
      }

      const separator = /<p>\$\$\$\$(.*?)<\/p>|\$\$\$\$/g;
      // eslint-disable-next-line no-unused-vars
      const [standardText, _, saleText] = text
        .split(separator)
        .map(part => (part ? part.trim() : ''));

      if (this.isSale && saleText) {
        return saleText;
      }

      return standardText;
    }
  }
};
