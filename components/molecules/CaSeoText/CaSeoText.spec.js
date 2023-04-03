import { shallowMount } from '@vue/test-utils';
import CaSeoText from './CaSeoText.vue';

describe('CaSeoText.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSeoText);
    expect(component.contains('.ca-seo-text')).toBe(true);
  });
});
