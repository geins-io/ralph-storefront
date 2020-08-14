export const state = () => ({
  counter: 0,
  favorites: [],
  VATincluded: true,
  scrollTop: 0,
  viewportWidth: 0,
  cart: {},
  cartId: ''
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  toggleFavorite(state, prodID) {
    const favorites = state.favorites;
    if (favorites.includes(prodID)) {
      favorites.splice(favorites.indexOf(prodID), 1);
    } else {
      favorites.push(prodID);
    }
  },
  setVATincluded(state, vatincluded) {
    state.VATincluded = vatincluded;
  },
  setScrollTop(state) {
    state.scrollTop = window.pageYOffset;
  },
  setViewportWidth(state) {
    state.viewportWidth = window.innerWidth;
  },
  updateCart(state, cart) {
    state.cart = cart;
  },
  setCartId(state, id) {
    state.cartId = id;
  }
};

export const actions = {
  initScrollListener(context) {
    let timeout;
    window.addEventListener(
      'scroll',
      () => {
        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {
          // Run scroll functions
          context.commit('setScrollTop');
        });
      },
      { passive: true }
    );
  },
  initResizeListener(context) {
    let timeout;
    window.addEventListener(
      'resize',
      () => {
        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {
          // Run resize functions
          context.commit('setViewportWidth');
        });
      },
      { passive: true }
    );
  }
};

export const getters = {
  siteIsAtTop(state) {
    return state.scrollTop <= 10;
  },
  viewportLaptop(state) {
    return state.viewportWidth >= 1024;
  },
  viewportMobile(state) {
    return state.viewportWidth < 768;
  },
  isFavorite: state => prodId => {
    return state.favorites.includes(prodId);
  },
  currentApiKey() {
    return '5324971256';
  },
  cartSum(state) {
    return state.cart.items ? state.cart.items.length : 0;
  },
  cartTotal(state) {
    return state.VATincluded
      ? state.cart.total.sellingPriceIncVatFormatted
      : state.cart.total.sellingPriceExVatFormatted;
  }
};
