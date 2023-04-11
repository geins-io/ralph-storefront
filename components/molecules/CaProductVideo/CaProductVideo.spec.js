import { shallowMount } from '@vue/test-utils';
import CaProductVideo from './CaProductVideo.vue';

describe('CaProductVideo.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductVideo);
    expect(component.contains('.ca-product-video')).toBe(true);
  });
});
