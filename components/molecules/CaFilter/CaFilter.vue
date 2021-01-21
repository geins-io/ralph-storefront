<template>
  <div
    v-show="values.length > 1 || typeRange"
    class="ca-filter"
    :class="modifiers"
  >
    <div class="ca-filter__title" @click="() => (open = !open)">
      {{ title }}
      <span v-if="selectionMade && !typeRange" class="ca-filter__chosen-amount">
        ({{ selection.length }})
      </span>
      <CaIcon class="ca-filter__arrow" name="chevron-down" />
    </div>
    <SlideUpDown class="ca-filter__values" :active="open" :duration="200">
      <LazyCaFilterMulti
        v-if="!typeRange"
        :values="values"
        :selection="selection"
        @selectionchange="$emit('selectionchange', $event)"
      />
      <LazyCaFilterRange
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

// @group Molecules
// @vuese
export default {
  name: 'CaFilter',
  components: { SlideUpDown },
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
}
</style>
