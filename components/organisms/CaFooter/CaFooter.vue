<template>
  <footer class="ca-footer">
    <section class="ca-footer__section ca-footer__section--usps">
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
    </section>
    <section class="ca-footer__section ca-footer__section--newsletter">
      <CaContainer>
        <div class="ca-footer__newsletter">
          <h2 class="ca-footer__newsletter-title">
            {{ $t('NEWSLETTER_TITLE') }}
          </h2>
          <p class="ca-footer__newsletter-text">
            {{ $t('NEWSLETTER_TEXT') }}
          </p>
          <CaNewsletter class="ca-footer__newsletter-form" />
        </div>
      </CaContainer>
    </section>
    <section class="ca-footer__section ca-footer__section--content">
      <CaContainer class="ca-footer__content-holder">
        <section class="ca-footer__column">
          <h2 class="ca-footer__title">Kundtjänst</h2>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">Mail:</span>
            <a
              class="ca-footer__contact-info"
              :href="'mailto:' + $config.customerServiceEmail"
            >
              {{ $config.customerServiceEmail }}
            </a>
          </div>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">Telefon:</span>
            <a
              class="ca-footer__contact-info"
              :href="'tel:' + $config.customerServicePhone"
            >
              {{ $config.customerServicePhone }}
            </a>
          </div>
        </section>
        <section class="ca-footer__column">
          <CaFooterNavigation menu-location-id="footer-first" />
        </section>
        <section class="ca-footer__column">
          <CaFooterNavigation menu-location-id="footer-second" />
        </section>
        <section class="ca-footer__column">
          <h2 class="ca-footer__title">Följ oss</h2>
          <ul class="ca-footer__social">
            <li
              v-for="(link, index) in $config.socialMediaLinks"
              :key="index"
              class="ca-footer__social-item"
            >
              <CaIconButton
                class="ca-footer__social-link"
                :href="link.link"
                :icon-name="link.icon"
                :aria-label="link.title"
              />
            </li>
          </ul>
        </section>
      </CaContainer>
    </section>
    <section class="ca-footer__section ca-footer__section--bottom">
      <CaContainer class="ca-footer__bottom">
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo ca-footer__logo--first"
            folder="logos"
            filename="klarna"
            alt="Klarna logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="visa"
            alt="Visa logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="mastercard"
            alt="Mastercard logo"
          />
        </div>
        <div class="ca-footer__bottom-column ca-footer__bottom-column--logos">
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="schenker"
            alt="Schenker logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="postnord"
            alt="Postnord logo"
          />
          <CaSvgAsset
            class="ca-footer__logo"
            folder="logos"
            filename="dhl"
            alt="DHL logo"
          />
        </div>
        <div
          class="ca-footer__bottom-column ca-footer__bottom-column--copyright"
        >
          <div class="ca-footer__copyright">
            Copyright &copy; {{ $config.currentChannelSettings.siteName }}
          </div>
          <a
            class="ca-footer__powered-by"
            href="https://www.geins.io"
            target="_blank"
          >
            Powered by
            <CaSvgAsset
              class="ca-footer__geins"
              folder="logos"
              filename="geins-black"
              alt="Geins logo"
            />
          </a>
        </div>
      </CaContainer>
    </section>
  </footer>
</template>
<script>
/*
  Footer component for the site.
*/
export default {
  name: 'CaFooter',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    uspLogoPlacement() {
      return this.$store.getters.viewport === 'phone' ? 'top' : 'left';
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-footer';
</style>
