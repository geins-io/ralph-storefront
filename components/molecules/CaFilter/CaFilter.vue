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
/*
  CaFilter is a reusable component that displays a title and a list of values.
  It receives four props:
  - title: a string representing the title
  - values: an array of objects representing the values
  - selection: an array of objects representing the selected values
  - type: a string representing the type of filter ('multi' or 'range')
  It emits an event when the selection changes:
  - selectionchange: an array of objects representing the new selection
*/
import SlideUpDown from 'vue-slide-up-down';
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
<style lang="scss">
@import 'molecules/ca-filter';
</style>
