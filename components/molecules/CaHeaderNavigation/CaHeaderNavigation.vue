<template>
  <nav class="ca-header-navigation" :class="modifiers">
    <ul v-if="menu" class="ca-header-navigation__items">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-header-navigation__item"
        :class="{
          'ca-header-navigation__item--open':
            open === item.id && item.children.length
        }"
        @mouseover="handleMouseOver(item.id)"
        @mouseleave="handleMouseLeave"
        @click="handleClick(item.id)"
      >
        <component
          :is="getElem(item)"
          v-bind="getAttrs(item)"
          class="ca-header-navigation__link"
        >
          <CaIconAndText
            v-if="item.children.length"
            icon-name="chevron-down"
            icon-position="right"
            class="ca-header-navigation__link-label"
            :class="
              'ca-header-navigation__link-label--' +
                getLabel(item).toLowerCase()
            "
          >
            {{ getLabel(item) }}
          </CaIconAndText>
          <span v-else class="ca-header-navigation__link-label">
            {{ getLabel(item) }}
          </span>
        </component>
        <div v-if="item.children.length" class="ca-header-navigation__children">
          <component
            :is="containerElem"
            class="ca-header-navigation__children-container"
            :class="getContainerClass(item)"
          >
            <ul class="ca-header-navigation__children-list">
              <li
                v-for="childItem in item.children"
                :key="childItem.id"
                class="ca-header-navigation__child-item"
                :class="{
                  'ca-header-navigation__child-item--parent':
                    childItem.children.length > 0
                }"
              >
                <component
                  :is="getBaseElem(childItem)"
                  v-bind="getAttributes(childItem)"
                  class="ca-header-navigation__child-link"
                  :class="{
                    'ca-header-navigation__custom-link':
                      childItem.type === 'custom' &&
                      childItem.children.length === 0
                  }"
                >
                  {{ getLabel(childItem) }}
                </component>
                <CaIcon
                  v-if="childItem.children.length && type === 'boxed'"
                  name="chevron-right"
                  class="ca-header-navigation__icon"
                />
                <ul
                  v-if="childItem.children.length"
                  class="ca-header-navigation__grand-children"
                >
                  <li
                    v-for="grandChildItem in childItem.children"
                    :key="grandChildItem.id"
                    class="ca-header-navigation__grand-child-item"
                  >
                    <component
                      :is="getBaseElem(grandChildItem)"
                      v-bind="getAttributes(grandChildItem)"
                      class="ca-header-navigation__grand-child-link"
                      :class="{
                        'ca-header-navigation__custom-link':
                          grandChildItem.type === 'custom'
                      }"
                    >
                      {{ getLabel(grandChildItem) }}
                    </component>
                  </li>
                </ul>
              </li>
            </ul>
            <!-- TODO: Add widget area to DB for real data -->
            <div class="ca-header-navigation__widget-area">
              <div></div>
            </div>
            <!-- <CaWidgetArea
              ref="widgetarea"
              class="ca-header-navigation__widget-area"
              family="Menu"
              area-name="Menu area"
              :filters="[
                {
                  key: 'MenuLabel',
                  value: `${getLabel(item)}`
                }
              ]"
            /> -->
          </component>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// Navigation fitting for the header. Supports three levels<br><br>
// **SASS-path:** _./styles/components/molecules/ca-header-navigation.scss_
export default {
  name: 'CaHeaderNavigation',
  mixins: [MixMenu],
  props: {
    // What type/style of menu should be displayed
    type: {
      // `full-width` / `boxed`
      type: String,
      default: 'full-width'
    },
    // Choose between hover or click to open menu
    menuState: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['click', 'hover'].includes(value);
      }
    }
  },
  data: () => ({
    open: 0
  }),
  computed: {
    currentLocale() {
      return this.$i18n.localeProperties.code.toLowerCase();
    },
    modifiers() {
      return 'ca-header-navigation--' + this.type;
    },
    containerElem() {
      return this.type === 'full-width' ? 'CaContainer' : 'div';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    openMenu(id) {
      this.open = id;
    },
    closeMenu() {
      this.open = 0;
    },
    toggleMenu(id) {
      if (this.open !== id) {
        this.closeMenu();
        this.openMenu(id);
      } else {
        this.closeMenu();
      }
    },
    handleClick(id) {
      if (this.menuState === 'click') {
        this.toggleMenu(id);
      } else {
        this.closeMenu();
      }
    },
    handleMouseOver(id) {
      if (this.menuState === 'hover') {
        this.openMenu(id);
      }
    },
    handleMouseLeave() {
      if (this.menuState === 'hover') {
        this.closeMenu();
      }
    },
    getElem(item) {
      if (this.menuState === 'hover') {
        return this.getBaseElem(item);
      }
      return item.children.length ? 'button' : this.getBaseElem(item);
    },
    getAttrs(item) {
      if (this.menuState === 'hover') {
        return this.getAttributes(item);
      }
      return item.children.length
        ? {
            type: 'button',
            'aria-expanded': this.open === item.id
          }
        : this.getAttributes(item);
    },
    getContainerClass(item) {
      const children = item.children;
      const baseClass = 'ca-header-navigation__children-container--';
      let modifier = 'xs';
      const nrOfChildren = children.length;

      let nrOfGrandChildren = 0;
      let nrOfChildrenWithGrandChildren = 0;

      children.forEach(child => {
        nrOfGrandChildren += child.children.length;
        if (child.children.length) {
          nrOfChildrenWithGrandChildren++;
        }
      });

      const totalLinks = nrOfChildren + nrOfGrandChildren;
      const totalTopLevelChildren =
        nrOfChildren - nrOfChildrenWithGrandChildren;

      if (totalLinks <= 7 && nrOfChildrenWithGrandChildren <= 1) {
        modifier = 'l';
      } else if (totalLinks <= 14 && nrOfChildrenWithGrandChildren <= 2) {
        if (totalTopLevelChildren > 7 && nrOfChildrenWithGrandChildren >= 1) {
          modifier = 's';
        } else {
          modifier = 'm';
        }
      } else if (totalLinks <= 21 && nrOfChildrenWithGrandChildren <= 3) {
        if (totalTopLevelChildren > 14 && nrOfChildrenWithGrandChildren >= 1) {
          modifier = 'xs';
        } else {
          modifier = 's';
        }
      }
      return baseClass + modifier;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-header-navigation';
</style>
