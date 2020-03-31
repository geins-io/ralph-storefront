<template>
  <div class="container">
    <ca-logo />
    <h1 class="title">
      @ralph/ralph-storefront
    </h1>
    <h2 class="subtitle">
      E-commerce frontend by Carismar
    </h2>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}
    </nuxt-link>

    <a @click="increment">{{ counter }}</a>
    <br />
    <ca-icon-and-text icon-name="anchor">Anchor</ca-icon-and-text>
    <br />
    <ca-icon-and-text icon-name="arrow-down-circle" icon-position="right"
      >Down</ca-icon-and-text
    >
    <br />
    <ca-icon-and-text icon-name="archive" icon-position="top"
      >Archive</ca-icon-and-text
    >
    <br />
    <ca-vat-toggle />
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Logo from '@/components/Logo.vue';
import { CaLogo, CaIconAndText, CaVatToggle } from '@ralph/ralph-ui';
export default {
  components: {
    CaLogo,
    CaIconAndText,
    CaVatToggle
  },
  fetch({ store }) {
    store.commit('increment');
  },
  data() {
    return {
      message: process.env.VUE_APP_TITLE
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    ...mapState(['counter'])
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    }
  }
};
</script>

<style></style>
