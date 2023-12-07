import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({}),
  link: new HttpLink({ uri: process.env.API_ENDPOINT, fetch }),
});
