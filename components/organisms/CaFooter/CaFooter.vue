<template>
  <footer class="ca-footer">
    <section class="ca-footer__section ca-footer__section--newsletter">
      <CaContainer>
        <div class="ca-footer__newsletter">
          <h2 class="ca-footer__newsletter-title">
            {{ $t('NEWSLETTER_TITLE') }}
          </h2>
          <CaSvgAsset
            class="ca-footer__newsletter-logo"
            folder="icons"
            filename="newsletter"
            alt="Newsletter signup logo"
          />
          <p class="ca-footer__newsletter-offer">
            {{ $t('NEWSLETTER_OFFER') }}
          </p>
          <p class="ca-footer__newsletter-text">
            {{ $t('NEWSLETTER_TEXT') }}
          </p>
          <CaNewsletter class="ca-footer__newsletter-form" />
          <p class="ca-footer__newsletter-policy">
            {{ $t('NEWSLETTER_POLICY') }} 
          </p>
        </div>
      </CaContainer>
    </section>

    <section class="ca-footer__section ca-footer__section--usps">
      <CaContainer class="ca-footer__usps">
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-mark"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_1') }}
        </CaIconAndText>
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-mark"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_2') }}
        </CaIconAndText>
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-mark"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_3') }}
        </CaIconAndText>
        <CaIconAndText
          class="ca-footer__usp"
          icon-name="check-mark"
          :icon-position="uspLogoPlacement"
        >
          {{ $t('USP_4') }}
        </CaIconAndText>
      </CaContainer>
    </section>

    <section class="ca-footer__section ca-footer__section--logos">
      <h2 class="ca-footer__title ca-footer__title--logos">Betalning och leverans</h2>
        <ul class="ca-footer__logo-options">
          <li
            v-for="(link, index) in $config.paymentAndDeliveryLogos"
            :key="index"
          >
            <CaSvgAsset
              class="ca-footer__logo-options-item"
              folder="logos"
              :filename="link.name"
              :alt="`${link.name} logo`"
            />
          </li>
        </ul>
    </section>
    
    <section class="ca-footer__section ca-footer__section--content">
      <CaContainer class="ca-footer__content-holder">
        <CaAccordionItem
          v-if="$store.getters.viewport === 'phone'"
          class="ca-footer-navigation-accordion"
          base-tag="section"
          icon-open="chevron-up"
          icon-closed="chevron-down"
        >
          <template #toggle-text>
            <h2>{{ $t('CUSTOMER_SERVICE') }}</h2>
          </template>
          <div class="ca-footer-navigation-accordion__list ca-footer-navigation-accordion__list--contact">
            <div class="ca-footer__contact">
              <span class="ca-footer__contact-title">
                {{ $t('CUSTOMER_SERVICE_PHONE_TITLE') }}
              </span>
              <a
                class="ca-footer__contact-info"
                :href="'tel:' + $t('CUSTOMER_SERVICE_PHONE')"
              >
                {{ $config.customerServicePhone }}
              </a>
            </div>
            <div class="ca-footer__contact">
              <span class="ca-footer__contact-title">
                {{ $t('CUSTOMER_SERVICE_MAIL_TITLE') }}
              </span>
              <a
                class="ca-footer__contact-info"
                :href="'mailto:' + $t('CUSTOMER_SERVICE_EMAIL')"
              >
                {{ $t('CUSTOMER_SERVICE_EMAIL') }}
              </a>
            </div>
            <span>{{ $t('CUSTOMER_SERVICE_OPEN') }}</span>
            <p class="ca-footer__disclaimer">{{ $t('CUSTOMER_SERVICE_INFO') }}</p>
          </div>
        </CaAccordionItem>
        <section v-else>
          <h2 class="ca-footer__title">{{ $t('CUSTOMER_SERVICE') }}</h2>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">
              {{ $t('CUSTOMER_SERVICE_PHONE_TITLE') }}
            </span>
            <a
              class="ca-footer__contact-info"
              :href="'tel:' + $config.customerServicePhone"
            >
              {{ $config.customerServicePhone }}
            </a>
          </div>
          <div class="ca-footer__contact">
            <span class="ca-footer__contact-title">
                {{ $t('CUSTOMER_SERVICE_MAIL_TITLE') }}
              </span>
            <a
              class="ca-footer__contact-info"
              :href="'mailto:' + $t('CUSTOMER_SERVICE_EMAIL')"
            >
              {{ $t('CUSTOMER_SERVICE_EMAIL') }}
            </a>
          </div>
          <span>{{ $t('CUSTOMER_SERVICE_OPEN') }}</span>
          <p class="ca-footer__disclaimer">{{ $t('CUSTOMER_SERVICE_INFO') }}</p>
        </section>
        
        <section>
          <CaFooterNavigationAccordion
            v-if="$store.getters.viewport === 'phone'"
            menu-location-id="footer-first"
            class="ca-footer__accordion-support"
          />
          <CaFooterNavigation v-else menu-location-id="footer-first" />
        </section>
        
        <section>
          <CaFooterNavigationAccordion
            v-if="$store.getters.viewport === 'phone'"
            menu-location-id="footer-second"
            class="ca-footer__accordion-about"
          />
          <CaFooterNavigation v-else menu-location-id="footer-second" />
        </section>

        <section class="ca-footer__cert">
          <CaImage
            class="ca-footer__cert-tryggehandel"
            :src="require('~/assets/logos/' + 'trygg-e-handel-se.png')"
            alt="Trygg e-handel logo"
            :ratio="1"
          />
          <CaImage
            class="ca-footer__cert-hallbarehandel"
            :src="require('~/assets/logos/' + 'hallbar-e-handel.png')"
            alt="Trygg e-handel logo"
            :ratio="1"
          />
        </section>
      </CaContainer>
    </section>
    
    <section class="ca-footer__section ca-footer__section--bottom">
      <CaContainer class="ca-footer__bottom">
        <section class="ca-footer__social">
          <h2 class="ca-footer__title ca-footer__title--social">Följ oss</h2>
          <ul class="ca-footer__social-inner">
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
        
        <div class="ca-footer__corp">
          <CaLogo
            class="ca-footer__main-logo"
            :alt="$t('LOGO_ALT_TEXT')"
          />
          <p class="ca-footer__corp-info">{{ $t('FOOTER_CORP_CONTENT') }}</p>
        </div>

        <div class="ca-footer__copyright">
          Copyright &copy; Ralph Storefront
          <a
            class="ca-footer__powered-by"
            href="https://www.carismar.com"
            target="_blank"
          >
            Powered by
            <CaSvgAsset
              class="ca-footer__carismar"
              folder="logos"
              filename="carismar-black"
              alt="Carismar logo"
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-footer';
</style>
