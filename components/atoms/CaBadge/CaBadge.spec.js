import { shallowMount } from '@vue/test-utils';
import CaBadge from './CaBadge.vue';

describe('CaBadge.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaBadge);
    expect(component.contains('.ca-badge')).toBe(true);
  });
});

