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
    logout() {
      this.$cookies.remove('ralph-auth');
      this.$cookies.remove('ralph-auth-refresh');
      this.$store.dispatch('auth/setAuth', null);
      this.$router.push({ path: '/' });
    }
  }
};
</script>
<style lang="scss">
.ca-account-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-weight: $font-weight-bold;
    font-size: $font-size-l;
    @include bp(tablet) {
      font-size: $font-size-xl;
    }
  }
  &__log-out {
    line-height: 1;
  }
  &__nav {
    width: 100%;
    margin: $px20 0 $px24;
    display: flex;
    @include bp(tablet) {
      margin: $px16 0 $px24;
    }
  }
  &__nav-item {
    display: inline-block;
    padding: $px10 rem-calc(15px);
    margin: 0 $px20 0 0;
    background: $c-lightest-gray;
    font-size: $font-size-m;
    border-radius: $default-radius;
    border: 1px solid transparent;
    transition: background 150ms ease, border 150ms ease;
    &:hover {
      background: $c-light-gray;
    }
    @include bp(tablet) {
      padding: rem-calc(14px) rem-calc(25px);
      font-size: $font-size-l;
    }
    &--current {
      border: 1px solid $c-accent-color;
      background: $c-light-gray;
      position: relative;
      font-weight: $font-weight-bold;
      &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid $c-accent-color;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
      }
    }
  }
}
</style>
