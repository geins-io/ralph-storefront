import { shallowMount } from '@vue/test-utils';
import CaFooter from './CaFooter.vue';

describe('CaFooter.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFooter);
    expect(component.contains('.ca-footer')).toBe(true);
  });
});
