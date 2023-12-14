export function getMarketSettings() {
  // Set the domain settings and market settings based on if env-variable DOMAINS exists
  // Default settings for multi market / multi language
  // TODO: All this should come from channelSettings when we have a way to get channel settings from api
  let domainSettings = {
    differentDomains: false,
    strategy: 'prefix',
  };
  let domainUrls = null;

  // Default settings for market for publicRuntimeConfig
  let marketSettings = {
    isMultiLanguage: true,
    marketInPath: true,
  };

  if (process.env.DOMAINS) {
    const domains = process.env.DOMAINS.split(',');

    domainUrls = domains
      ?.map((domain) => {
        const domainArr = domain?.split('|');
        return {
          [domainArr[0]]: domainArr[1] || '',
        };
      })
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    // If using DOMAINS, turn off multilang and marketInPath
    marketSettings = {
      isMultiLanguage: false,
      marketInPath: false,
    };

    // If site should have only language prefix and no market prefix, remove the following declaration
    domainSettings = {
      differentDomains: false,
      strategy: 'prefix_except_default',
    };

    if (domains.length > 1) {
      // If more than one domain, set diffrentDomains to true
      domainSettings = {
        differentDomains: true,
        strategy: 'no_prefix',
      };
    }
  }
  return {
    domainSettings,
    domainUrls,
    marketSettings,
  };
}
