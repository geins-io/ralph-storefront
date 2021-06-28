<template>
  <div class="ca-filter" :class="modifiers">
    <div class="ca-filter__title" @click="() => (open = !open)">
      {{ title }}
      <span v-if="selectionMade" class="ca-filter__chosen-amount">
        ({{ currentSelection.length }})
      </span>
      <CaIcon class="ca-filter__arrow" name="chevron-down" />
    </div>
    <SlideUpDown class="ca-filter__values" :active="open" :duration="200">
      <LazyCaFilterMulti
        v-if="!typeRange"
        :values="values"
        :selection="currentSelection"
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
      type: [Array],
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
    open: false,
    currentSelection: []
  }),
  computed: {
    modifiers() {
      return {
        'ca-filter--open': this.open,
        'ca-filter--chosen': this.selectionMade
      };
    },
    typeRange() {
      return this.type === 'range';
    },
    selectionMade() {
      return this.currentSelection.length > 0;
    }
  },
  watch: {
    selection: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.currentSelection = this.selection;
        }
      }
    }
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-filter {
  $block: &;
  position: relative;
  &__title {
    padding: 0px 43px 0px 15px;
    line-height: 38px;
    height: 40px;
    border: $border-light;
    background: $c-lightest-gray;
    transition: border-color 200ms ease;
    cursor: pointer;
    position: relative;
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
    width: 100%;
    padding: $px12;
  }

  &--chosen & {
    &__title {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
