import { shallowMount } from '@vue/test-utils';
import CaQuickshopPanel from './CaQuickshopPanel.vue';

describe('CaQuickshopPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaQuickshopPanel);
    expect(component.contains('.ca-quickshop-panel')).toBe(true);
  });
});
