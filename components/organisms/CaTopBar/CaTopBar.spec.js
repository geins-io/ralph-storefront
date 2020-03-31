import { shallowMount } from '@vue/test-utils';
import CaTopBar from './CaTopBar.vue';

describe('CaTopBar.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaTopBar);
    expect(component.contains('.ca-top-bar')).toBe(true);
  });
});
