import { shallowMount } from '@vue/test-utils';
import CaLogoDisplay from './CaLogoDisplay.vue';

describe('CaLogoDisplay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaLogoDisplay);
    expect(component.contains('.ca-logo-display')).toBe(true);
  });
});

