export default function(to, from, savedPosition) {
  if (to.name.includes('account') && from.name.includes('account')) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
}
