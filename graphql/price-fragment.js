import gql from 'graphql-tag';
export const priceFragment = gql`
  fragment price on Price {
    isDiscounted
    regularPriceIncVat
    sellingPriceIncVat
    regularPriceExVat
    sellingPriceExVat
  }
`;
