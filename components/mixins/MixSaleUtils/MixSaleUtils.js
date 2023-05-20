/* 
  Helpers for sale pages
*/
export default {
  name: 'MixSaleUtils',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    // @vuese
    // Check if current route includes sale segment
    isSale() {
      if (!this.$route?.path) {
        return false;
      }

      /* Array for multiple sale markets (in order): sv, en, da, fi, nb */
      const markets = ['rea', 'sale', 'udsalg', 'ale', 'tilbud'];

      return markets.some(x => this.$route.path.includes(x));
    },
    // @vuese
    // Compute sale facet name
    saleFacet() {
      const facet = 'rp_sale_';
      const currency = this.$store.getters['channel/currentCurrency'];

      return `${facet}${currency}`.toLowerCase();
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get standard or sale text, depending on isSale
    // @arg text (String)
    textVariation(text) {
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
