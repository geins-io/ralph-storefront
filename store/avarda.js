import validateOrderCreation from 'checkout/validate-order-creation.graphql';

export const state = () => ({
  customerValidation: null,
});

export const mutations = {
  setCustomerValidation(state, data) {
    state.customerValidation = data;
  },
};

export const actions = {
  validateOrderCreation({ commit, getters, rootState }, data) {
    const { payload, checkoutInstance } = data;

    const address = payload?.invoicingAddress;

    const checkout = {
      email: payload?.email,
      billingAddress: {
        firstName: address?.firstName,
        lastName: address?.lastName,
        addressLine1: address?.address1,
        zip: address?.zip,
        city: address?.city,
      },
    };

    const client = this.app.apolloProvider.defaultClient;
    client
      .query({
        query: validateOrderCreation,
        variables: {
          cartId: rootState.cart.data.id,
          checkout,
          checkoutMarketId: rootState.channel.checkoutMarket,
        },
        fetchPolicy: 'no-cache',
      })
      .then((result) => {
        if (result?.data?.validateOrderCreation) {
          const customerValidation = {
            ...result.data.validateOrderCreation,
            paymentType: payload.selectedPaymentMethodType,
          };

          commit('setCustomerValidation', customerValidation);

          if (getters.customerStatus === 'ok') {
            checkoutInstance.beforeSubmitContinue();
          } else {
            checkoutInstance.beforeSubmitAbort();
          }
        }
      })
      .catch((error) => {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      });
  },
};

export const getters = {
  customerStatus: (state) => {
    const validation = state.customerValidation;

    if (
      !validation?.isValid &&
      validation?.message === 'Customer is blacklisted'
    ) {
      return 'blacklisted';
    }

    const memberType = validation?.memberType?.replace(/\s/g, '') || '';

    if (
      memberType.startsWith('NOCREDIT') &&
      (validation?.paymentType === 'DirectInvoice' ||
        validation?.paymentType === 'Loan')
    ) {
      const type = memberType.split('-')[1];
      const status = type ? type.toLowerCase() : 'limited';

      return status;
    }

    return 'ok';
  },
};
