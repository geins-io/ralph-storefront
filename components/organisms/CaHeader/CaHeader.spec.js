import { shallowMount } from '@vue/test-utils';
import CaHeader from './CaHeader.vue';

describe('CaHeader.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaHeader);
    expect(component.contains('.ca-header')).toBe(true);
  });
});
