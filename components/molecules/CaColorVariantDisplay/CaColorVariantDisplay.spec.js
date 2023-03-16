import { shallowMount } from '@vue/test-utils';
import CaColorVariantDisplay from './CaColorVariantDisplay.vue';

describe('CaColorVariantDisplay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaColorVariantDisplay);
    expect(component.contains('.ca-color-variant-display')).toBe(true);
  });
});

