// TODO: Get this info from the api and fill with settings for every channel
export const channelSettings = [
  {
    channelId: '1|se',
    siteName: 'Ralph Storefront',
    // All theme settings will be converted into css variables and added to the root html element
    theme: {
      'accent-color': '#363636',
    },
  },
];

export const currentChannelSettings =
  channelSettings.find(
    (i) => i.channelId === process.env.FALLBACK_CHANNEL_ID,
  ) || channelSettings[0];
