<template>
  <div class="ca-filter" :class="modifiers">
    <div class="ca-filter__title" @click="() => (open = !open)">
      {{ title }}
      <span v-if="selectionMade && !typeRange" class="ca-filter__chosen-amount">
        ({{ selection.length }})
      </span>
      <CaIcon class="ca-filter__arrow" name="chevron-down" />
    </div>
    <SlideUpDown class="ca-filter__values" :active="open" :duration="200">
      <CaFilterMulti
        v-if="!typeRange"
        :values="values"
        :selection="selection"
        @selectionchange="$emit('selectionchange', $event)"
      />
      <CaFilterRange
        v-else
        :values="values"
        :selection="selection"
        @selectionchange="$emit('selectionchange', $event)"
      />
    </SlideUpDown>
  </div>
</template>
<script>
import SlideUpDown from 'vue-slide-up-down';
import { CaIcon, CaFilterMulti, CaFilterRange } from '@ralph/ralph-ui';
// @group Molecules
// @vuese
export default {
  name: 'CaFilter',
  components: { CaIcon, SlideUpDown, CaFilterMulti, CaFilterRange },
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    values: {
      type: [Array, Object],
      required: true
    },
    selection: {
      type: [Array, Object],
      required: true
    },
    type: {
      // 'multi', 'range'
      type: String,
      default: 'multi', // 'range'
      validator(value) {
        return ['multi', 'range'].includes(value);
      }
    }
  },
  data: () => ({
    open: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-filter--open': this.open,
        'ca-filter--chosen': this.selectionMade > 0
      };
    },
    typeRange() {
      return this.type === 'range';
    },
    selectionMade() {
      if (this.typeRange) {
        return (
          this.values.lowest !== this.selection.lowest ||
          this.values.highest !== this.selection.highest
        );
      } else {
        return this.selection && this.selection.length > 0;
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {}
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
    width: 200px;
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
    width: 200px;
    padding: $px12;
  }

  &--chosen & {
    &__title {
      font-weight: $font-weight-bold;
    }
  }

  ::v-deep .ca-filter-multi {
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
        .ca-filter-multi__check {
          opacity: 1;
        }
      }
      &--disabled {
        opacity: 0.3;
        pointer-events: none;
      }
    }
    &__check {
      opacity: 0;
      @include valign;
      left: 2px;
      transition: opacity 200ms ease;
      color: $c-success;
    }
  }
}
</style>
