import { shallowMount } from '@vue/test-utils';
import CaDiscountBadge from './CaDiscountBadge.vue';

describe('CaDiscountBadge.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaDiscountBadge);
    expect(component.contains('.ca-discount-badge')).toBe(true);
  });
});
