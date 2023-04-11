import { shallowMount } from '@vue/test-utils';
import CaSizeGuidePanel from './CaSizeGuidePanel.vue';

describe('CaSizeGuidePanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSizeGuidePanel);
    expect(component.contains('.ca-size-guide-panel')).toBe(true);
  });
});
