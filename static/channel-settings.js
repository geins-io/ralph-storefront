export default [
  {
    channelId: process.env.FALLBACK_CHANNEL_ID,
    locale: process.env.DEFAULT_LOCALE,
    domain: process.env.BASE_URL
  },
  {
    channelId: '2|en',
    locale: 'en',
    domain: process.env.DOMAIN_EN
  }
];
