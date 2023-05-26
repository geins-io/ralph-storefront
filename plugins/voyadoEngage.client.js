export default function(app, inject) {
  async function fetchVoyadoId(email) {
    try {
      const result = await fetch(`/api/voyado-engage?email=${email}`);

      return result?.text();
    } catch (error) {
      console.log(error);
    }
  }

  const setVoyadoId = async email => {
    const id = await fetchVoyadoId(email);

    if (!id) {
      return;
    }

    // eslint-disable-next-line no-undef
    va('setContactId', id);
    app.store.commit('voyadoEngage/setVoyadoId', id);
  };

  if (app.store.getters['auth/authenticated']) {
    setVoyadoId(app.store.state.auth.user);
  }

  // Listen to events in ralph and take action
  app.store.subscribe((mutation, state) => {
    if (mutation.type === 'events/push') {
      const eventType = mutation.payload.type;

      if (eventType.includes('cart')) {
        const cartItems = state.cart.data.items.map(item => {
          return {
            itemId: item.product.articleNumber,
            quantity: item.quantity
          };
        });

        const event = eventType.split(':')[1];
        const voyadoId = state.voyadoEngage.voyadoId;

        const params = {
          cartRef: state.cart.data.id,
          locale: state.channel.currentLocale,
          items: cartItems
        };

        if (voyadoId) {
          params.contactId = voyadoId;
        }

        if (event === 'add') {
          // eslint-disable-next-line no-undef
          va('cart', params);
        } else if (event === 'remove' && cartItems.length === 0) {
          // eslint-disable-next-line no-undef
          va('emptyCart', params);
        }
      }

      if (eventType.includes('user:login')) {
        setVoyadoId(state.auth.user);
      }
    }
  });
}
