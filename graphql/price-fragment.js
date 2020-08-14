import gql from 'graphql-tag';
export const priceFragment = gql`
  fragment price on Price {
    isDiscounted
    regularPriceIncVatFormatted
    sellingPriceIncVatFormatted
    regularPriceExVatFormatted
    sellingPriceExVatFormatted
  }
`;
