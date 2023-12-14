import { gql } from 'graphql-tag';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({}),
  link: new HttpLink({ uri: process.env.API_ENDPOINT, fetch }),
});

const defaultMetaQuery = gql`
  query listPageInfo(
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    listPageInfo(
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      meta {
        description
        title
      }
    }
  }
`;

const getMarketsQuery = gql`
  query channel($channelId: String) {
    channel(channelId: $channelId) {
      defaultMarketId
      markets {
        id
        defaultLanguageId
        alias
        virtual
        onlyDisplayInCheckout
        groupKey
        allowedLanguages {
          id
          name
          code
        }
        country {
          name
          code
        }
        currency {
          name
          code
        }
      }
    }
  }
`;

const fallbackChannelId = process.env.FALLBACK_CHANNEL_ID;
const fallbackMarketAlias = process.env.FALLBACK_MARKET_ALIAS;
const defaultLocale = process.env.DEFAULT_LOCALE;

export async function getFallbackMeta() {
  const getMetaQuery = await apolloClient.query({
    query: defaultMetaQuery,
    variables: {
      channelId: fallbackChannelId,
      marketId: fallbackMarketAlias,
      languageId: defaultLocale,
    },
    context: {
      headers: {
        'X-ApiKey': process.env.API_KEY,
      },
    },
  });

  return await getMetaQuery.data.listPageInfo.meta;
}

export async function getFallbackMarkets() {
  const getMarkets = await apolloClient.query({
    query: getMarketsQuery,
    variables: {
      channelId: fallbackChannelId,
    },
    context: {
      headers: {
        'X-ApiKey': process.env.API_KEY,
      },
    },
  });
  return await getMarkets.data.channel.markets;
}
