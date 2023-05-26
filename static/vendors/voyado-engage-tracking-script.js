/* eslint-disable */

(function(i, s, o, g, r, a, m) {
  i.VoyadoAnalyticsObject = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  'script',
  'https://assets.voyado.com/jsfiles/analytics_0.1.7.min.js',
  'va'
);
va('setTenant', 'bubbleroom');
