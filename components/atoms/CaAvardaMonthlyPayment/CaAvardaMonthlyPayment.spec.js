import { shallowMount } from '@vue/test-utils';
import CaAvardaMonthlyFee from './CaAvardaMonthlyFee.vue';

describe('CaAvardaMonthlyFee.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAvardaMonthlyFee);
    expect(component.contains('.ca-avarda-monthly-fee')).toBe(true);
  });
});

