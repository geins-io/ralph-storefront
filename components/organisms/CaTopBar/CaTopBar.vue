<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container">
      <CaTopBarNavigation
        v-show="!undistracted"
        class="only-computer"
        menu-location-id="top-bar"
      />
      <div class="ca-usp-block ca-top-bar__usps only-computer">
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_1') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_2') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_3') }}
        </CaIconAndText>
      </div>
      <div class="ca-top-bar__usp only-mobile">{{ $t('USP_TEXT') }}</div>
      <NuxtLink
        v-for="locale in availableLocales"
        v-show="!undistracted"
        :key="locale.code"
        class="ca-top-bar__lang-switcher only-computer"
        :to="switchLocalePath(locale.code)"
      >
        <CaFlag
          class="ca-top-bar__flag"
          :country="locale.flag"
          shape="circle"
        />
        {{ locale.name }}
      </NuxtLink>
      <button
        v-if="!$store.getters['auth/authenticated']"
        v-show="!undistracted"
        type="button"
        class="ca-top-bar__link ca-top-bar__link--login only-computer"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login'
          })
        "
      >
        <CaIconAndText icon-name="user">
          {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
        </CaIconAndText>
      </button>
      <NuxtLink
        v-else
        v-show="!undistracted"
        class="ca-top-bar__link ca-top-bar__link--login only-computer"
        :to="localePath('account-orders')"
      >
        <CaIconAndText icon-name="user">
          {{ $t('ACCOUNT_TITLE') }}
        </CaIconAndText>
      </NuxtLink>

      <!-- <CaVatToggle v-show="!undistracted" class="only-computer" /> -->
    </CaContainer>
  </div>
</template>
<script>
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-top-bar {
  background: $c-topbar-bg;
  font-size: $font-size-xs;
  z-index: $z-index-header;
  position: relative;
  body[style='overflow: hidden;'] &:not(.ca-top-bar--undistracted) {
    padding-right: var(--scrollbar-width);
  }
  &__container {
    height: $top-bar-height;
    line-height: $top-bar-height;
    @include flex-halign;
    @include bp(laptop) {
      height: $top-bar-height-computer;
      line-height: $top-bar-height-computer;
      justify-content: space-between;
    }
  }
  &__flag {
    margin-right: $px4;
    font-size: 15px;
  }
  &__usps {
    @include bp(desktop) {
      @include calign;
    }
  }
  &__usp {
    @include bp(laptop) {
      margin: 0 $px16;
    }
  }
  &__lang-switcher {
    margin: 0 $px20 0 auto;
  }
}
</style>
