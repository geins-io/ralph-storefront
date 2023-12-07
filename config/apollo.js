import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

export const apolloCache = new InMemoryCache({});
export const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: new HttpLink({ uri: process.env.API_ENDPOINT, fetch }),
});
