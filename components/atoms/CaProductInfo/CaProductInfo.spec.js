import { shallowMount } from '@vue/test-utils';
import CaProductInfo from './CaProductInfo.vue';

describe('CaProductInfo.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductInfo);
    expect(component.contains('.ca-product-info')).toBe(true);
  });
});

