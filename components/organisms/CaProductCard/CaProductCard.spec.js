import { shallowMount } from '@vue/test-utils';
import CaProductCard from './CaProductCard.vue';

describe('CaProductCard.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductCard);
    expect(component.contains('.ca-product-card')).toBe(true);
  });
});
