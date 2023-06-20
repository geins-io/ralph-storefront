import { shallowMount } from '@vue/test-utils';
import CaListPageVoyado from './CaListPageVoyado.vue';

describe('CaListPageVoyado.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListPageVoyado);
    expect(component.contains('.ca-list-page-voyado')).toBe(true);
  });
});
