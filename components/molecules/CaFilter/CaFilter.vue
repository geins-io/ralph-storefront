<template>
  <div class="ca-filter" :class="modifiers">
    <div class="ca-filter__title" @click="() => (open = !open)">
      {{ title }}
      <span v-if="currentSelection.length > 0" class="ca-filter__chosen-amount">
        ({{ currentSelection.length }})
      </span>
      <CaIcon class="ca-filter__arrow" name="chevron-down" />
    </div>
    <SlideUpDown class="ca-filter__values" :active="open" :duration="200">
      <ul class="ca-filter__list">
        <li
          v-for="(value, index) in valuesWithSelected"
          :key="index"
          class="ca-filter__value"
          :class="{ 'ca-filter__value--selected': value.selected }"
          @click="toggleFilterValue(value.name, !value.selected)"
        >
          <CaIcon class="ca-filter__check" name="check" />
          {{ value.name }}
        </li>
      </ul>
    </SlideUpDown>
  </div>
</template>
<script>
import SlideUpDown from 'vue-slide-up-down';
import { CaIcon } from '@ralph/ralph-ui';
// @group Molecules
// @vuese
export default {
  name: 'CaFilter',
  components: { CaIcon, SlideUpDown },
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    selection: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentSelection: [],
    open: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-filter--open': this.open,
        'ca-filter--chosen': this.currentSelection.length > 0
      };
    },
    valuesWithSelected() {
      if (this.values && this.values.length && this.selection) {
        return this.values.map(item => {
          const isSelected = this.currentSelection.some(el => el === item.name);
          this.$set(item, 'selected', isSelected);
          return item;
        });
      } else return [];
    }
  },
  watch: {},
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    toggleFilterValue(name, selected) {
      if (selected) {
        this.currentSelection.push(name);
      } else {
        this.currentSelection.splice(this.currentSelection.indexOf(name), 1);
      }
      this.$emit('selectionchange', this.currentSelection);
    }
  }
};
</script>
<style lang="scss" scoped>
.ca-filter {
  $block: &;
  &__title {
    padding: 0px 43px 0px 15px;
    line-height: 38px;
    height: 40px;
    border: $border-light;
    background: $c-lightest-gray;
    transition: border-color 200ms ease;
    cursor: pointer;
    position: relative;
    width: 170px;
  }
  &__arrow {
    @include valign;
    right: 14px;
    font-size: 16px;
  }
  &__values {
    border: $border-light;
    position: absolute;
    margin-top: 2px;
    z-index: 15;
    background: $c-lightest-gray;
    overflow: hidden;
    width: 170px;
    padding: $px12 $px24 $px12 $px12;
  }
  &__check {
    opacity: 0;
    @include valign;
    left: 2px;
    transition: opacity 200ms ease;
    color: $c-success;
  }
  &__value {
    padding-left: $px24;
    position: relative;
    line-height: 2;
    cursor: pointer;
    &:before {
      width: 18px;
      height: 18px;
      content: '';
      display: block;
      background: $c-white;
      border: $border-light;
      @include valign;
      left: 0;
    }
    &--selected {
      font-weight: $font-weight-bold;
      #{$block}__check {
        opacity: 1;
      }
    }
  }

  &--chosen & {
    &__title {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
