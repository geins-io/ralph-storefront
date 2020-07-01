import { shallowMount } from '@vue/test-utils';
import CaListPage from './CaListPage.vue';

describe('CaListPage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListPage);
    expect(component.contains('.ca-list-page')).toBe(true);
  });
});
