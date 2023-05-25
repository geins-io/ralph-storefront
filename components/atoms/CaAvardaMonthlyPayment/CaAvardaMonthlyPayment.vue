<template>
  <p class="ca-avarda-monthly-payment">
    {{
      $t('AVARDA_MONTHLY_PAYMENT', {
        sum: formattedSum
      })
    }}
  </p>
</template>
<script>
import MixNumberFormat from 'MixNumberFormat';
// @group Atoms
// @vuese
export default {
  name: 'CaAvardaMonthlyPayment',
  mixins: [MixNumberFormat],
  props: {
    price: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    months: 12,
    statementFee: 0
  }),
  computed: {
    // The formatted monthly payment sum
    formattedSum() {
      const price = this.price.sellingPriceIncVat;
      const montlyFee = this.getMonthlyPayment(
        this.months,
        price,
        this.statementFee,
        this.yearInterestRate
      );
      return this.formatCurrency(montlyFee);
    },
    // The interest rate for the current market
    yearInterestRate() {
      switch (this.$store.state.channel.currentMarket) {
        case 'no':
          return 22.95;
        case 'fi':
          return 17.5;
        default:
          return 19.92;
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // Calculation from https://docs.avarda.com/checkout-3/monthly-fee-calculation-script/
    getMonthlyPayment(months, price, statementFee, yearInterestRate) {
      return (
        Math.round(
          ((yearInterestRate / 1200 +
            yearInterestRate /
              1200 /
              ((1 + yearInterestRate / 1200) ** months - 1)) *
            price *
            100) /
            100
        ) + statementFee
      );
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-avarda-monthly-payment';
</style>
