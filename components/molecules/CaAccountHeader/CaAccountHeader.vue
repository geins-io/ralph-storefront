<template>
  <div class="ca-account-header">
    <h1 class="ca-account-header__title">
      {{ title }}
    </h1>
    <CaButton
      color="secondary"
      size="s"
      class="ca-account-header__log-out"
      @clicked="logout"
    >
      <CaIconAndText icon-name="log-out">
        {{ $t('LOG_OUT') }}
      </CaIconAndText>
    </CaButton>
    <nav class="ca-account-header__nav">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="localePath(item.path)"
        class="ca-account-header__nav-item"
        :class="{
          'ca-account-header__nav-item--current':
            localePath(item.path) === $route.path
        }"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </div>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaAccountHeader',
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    navItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push({ path: this.localePath('index') });
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-header';
</style>
