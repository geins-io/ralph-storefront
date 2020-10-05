<template>
  <div class="ca-footer">
    <div class="ca-footer__section ca-footer__section--usps">
      <CaContainer class="ca-footer__usps">
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-circle"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_1') }}
        </CaIconAndText>
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-circle"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_2') }}
        </CaIconAndText>
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-circle"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_3') }}
        </CaIconAndText>
      </CaContainer>
    </div>
    <div class="ca-footer__section ca-footer__section--newsletter">
      <CaContainer>
        <div class="ca-footer__newsletter">
          Här kommer det snart gå att anmäla sig till nyhetsbrev
        </div>
      </CaContainer>
    </div>
    <div class="ca-footer__section ca-footer__section--content">
      <CaContainer class="ca-footer__content-holder">
        <div class="ca-footer__column">
          <h3 class="ca-footer__title">Kundtjänst</h3>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">Mail:</span>
            <a class="ca-footer__contact-info" href="mailto:info@ralph.io">
              info@ralph.io
            </a>
          </div>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">Telefon:</span>
            <a class="ca-footer__contact-info" href="tel:123234345">
              123234345
            </a>
          </div>
          <h3 class="ca-footer__title">Shoppa som</h3>
          <CaVatToggle class="ca-footer__vat-toggle" />
        </div>
        <div class="ca-footer__column">
          <h3 class="ca-footer__title">Länkar</h3>
          <nav class="ca-footer__nav">
            <ul class="ca-footer__nav-list">
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Köpvillkor
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Köpvillkor
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Köpvillkor
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Köpvillkor
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="ca-footer__column">
          <h3 class="ca-footer__title">Guider</h3>
          <nav class="ca-footer__nav">
            <ul class="ca-footer__nav-list">
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Guider
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Guider
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Guider
                </a>
              </li>
              <li class="ca-footer__nav-item">
                <a href="#" class="ca-footer__nav-link">
                  Guider
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="ca-footer__column">
          <h3 class="ca-footer__title">Följ oss</h3>
          <ul class="ca-footer__social">
            <li class="ca-footer__social-item">
              <a class="ca-footer__social-link" href="#">
                <CaIcon name="facebook" class="ca-footer__social-icon" />
              </a>
            </li>
            <li class="ca-footer__social-item">
              <a class="ca-footer__social-link" href="#">
                <CaIcon name="instagram" class="ca-footer__social-icon" />
              </a>
            </li>
          </ul>
        </div>
      </CaContainer>
    </div>
    <div class="ca-footer__section ca-footer__section--bottom">
      <CaContainer class="ca-footer__bottom">
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo ca-footer__logo--first"
            folder="logos"
            filename="klarna"
          />
          <CaSvgAsset class="ca-footer__logo" folder="logos" filename="visa" />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="mastercard"
          />
        </div>
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="schenker"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="postnord"
          />
          <CaSvgAsset class="ca-footer__logo" folder="logos" filename="dhl" />
        </div>
        <div
          class="ca-footer__bottom-column ca-footer__bottom-column--copyright"
        >
          <div class="ca-footer__copyright">
            Copyright &copy; Ralph Storefront
          </div>
          <div class="ca-footer__powered-by">
            Powered by
            <CaSvgAsset
              class="ca-footer__carismar"
              folder="logos"
              filename="carismar-black"
            />
          </div>
        </div>
      </CaContainer>
    </div>
  </div>
</template>
<script>
import CaIconAndText from 'CaIconAndText';
import CaIcon from 'CaIcon';
import CaVatToggle from 'CaVatToggle';
import CaContainer from 'CaContainer';
import CaSvgAsset from 'CaSvgAsset';
// @group Organisms
// @vuese
export default {
  name: 'CaFooter',
  components: {
    CaIconAndText,
    CaIcon,
    CaVatToggle,
    CaContainer,
    CaSvgAsset
  },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    uspLogoPlacement() {
      return this.$store.getters.viewportMobile ? 'top' : 'left';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-footer {
  margin-top: $default-spacing;
  &__section {
    &--usps {
      background: $c-light-gray;
      padding: $px8 0;
    }
    &--newsletter {
      background: $c-lightest-gray;
      padding: $px20 0;
      @include bp(tablet) {
        padding: $px32 0;
      }
    }
    &--content {
      background: $c-light-gray;
      padding: $px24 0 $px32;
    }

    &--bottom {
      background: $c-medium-gray;
    }
  }

  &__usps {
    display: flex;
    text-align: center;
    justify-content: space-around;
    @include bp(tablet) {
      justify-content: center;
    }
  }

  &__usp {
    padding: 0 $px4;
    @include bp(tablet) {
      padding: 0 $px32;
    }
    .ca-icon-and-text__icon {
      margin-bottom: $px4;
      @include bp(tablet) {
        margin-bottom: 0;
      }
    }
  }

  &__newsletter {
    background: $c-light-gray;
    padding: $px16 $px12;
    text-align: center;
    font-size: $font-size-l;
    max-width: 500px;
    margin: 0 auto;
    @include bp(tablet) {
      padding: $px20 $px48;
    }
  }

  &__content-holder {
    @include bp(tablet) {
      display: flex;
    }
  }

  &__column {
    margin-bottom: $px20;
    line-height: 1.6;
    @include bp(tablet) {
      width: 25%;
    }
  }

  &__title {
    font-size: $font-size-l;
    margin-bottom: $px12;
    font-weight: $font-weight-bold;
    &:not(:first-child) {
      margin-top: $px20;
    }
    @include bp(tablet) {
      font-size: $font-size-xl;
    }
  }

  &__contact-title {
    font-weight: $font-weight-bold;
  }

  &__contact-info {
    text-decoration: underline;
  }

  &__vat-toggle {
    flex-direction: column;
  }

  &__nav-link {
    text-decoration: underline;
  }

  &__social {
    display: flex;
  }

  &__social-item {
    &:not(:last-child) {
      margin-right: $px20;
    }
  }

  &__social-icon {
    font-size: 30px;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include bp(tablet) {
      justify-content: space-between;
    }
  }

  &__bottom-column {
    &--logos {
      display: flex;
      justify-content: space-between;
      margin: $px20 0;
    }
    &--copyright {
      width: 74%;
      padding: $px12 0;
      margin: 0 auto;
      border-top: $border-light;
      text-align: center;
      font-size: $font-size-xs;
      color: $c-text-secondary;
      @include bp(tablet) {
        border: none;
        text-align: right;
        width: auto;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
      }
    }
  }

  &__logo {
    height: 15px;
    width: auto;
    padding: 0 $px4;
    @include bp(tablet) {
      height: 20px;
      padding: 0 $px16;
      &--first {
        padding-left: 0;
      }
    }
  }

  &__powered-by {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  &__carismar {
    height: 10px;
    margin-left: $px4;
    width: auto;
  }
}
</style>
