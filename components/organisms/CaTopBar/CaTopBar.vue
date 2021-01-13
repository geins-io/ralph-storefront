<template>
  <div class="ca-top-bar">
    <CaContainer class="ca-top-bar__container">
      <NuxtLink
        v-for="locale in availableLocales"
        v-show="!undistracted"
        :key="locale.code"
        class="ca-top-bar__lang-switcher only-desktop"
        :to="switchLocalePath(locale.code)"
      >
        <CaFlag
          class="ca-top-bar__flag"
          :country="locale.flag"
          shape="circle"
        />
        {{ locale.name }}
      </NuxtLink>
      <NuxtLink
        v-show="!undistracted"
        class="ca-top-bar__link ca-top-bar__link--customer-service only-desktop"
        to="/"
      >
        {{ $t('CUSTOMER_SERVICE') }}
      </NuxtLink>
      <div class="ca-usp-block ca-top-bar__usps only-desktop">
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
      <button
        v-show="!undistracted"
        class="ca-top-bar__link ca-top-bar__link--login only-desktop"
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
      <CaVatToggle v-show="!undistracted" class="only-desktop" />
    </CaContainer>
  </div>
</template>
<script>
import CaIconAndText from 'CaIconAndText';
import CaFlag from 'CaFlag';
import CaVatToggle from 'CaVatToggle';
import CaContainer from 'CaContainer';

export default {
  name: 'CaTopBar',
  components: {
    CaIconAndText,
    CaFlag,
    CaVatToggle,
    CaContainer
  },
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
  body[style='overflow: hidden;'] & {
    padding-right: var(--scrollbar-width);
  }
  &__container {
    height: $top-bar-height;
    line-height: $top-bar-height;
    @include flex-halign;
    @include bp(laptop) {
      height: $top-bar-height-desktop;
      line-height: $top-bar-height-desktop;
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
  &__link {
    &--login {
      margin: 0 $px24 0 auto;
    }
    &--customer-service {
      margin: 0 auto 0 $px24;
    }
  }
}
</style>
