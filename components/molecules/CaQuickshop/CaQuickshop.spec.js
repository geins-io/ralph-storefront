import { shallowMount } from '@vue/test-utils';
import CaQuickshop from './CaQuickshop.vue';

describe('CaQuickshop.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaQuickshop);
    expect(component.contains('.ca-quickshop')).toBe(true);
  });
});
