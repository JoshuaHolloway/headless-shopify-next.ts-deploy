// ==============================================

import { FetcherResults, ApiFetcherOptions } from '@common/types/api';

// ==============================================

// -Returns a Promise with {data: T}, where T is specified when we use fetchApi<T>()
const fetchApi = async <T>({
  url,
  query,
  variables,
}: ApiFetcherOptions): Promise<FetcherResults<T>> => {
  console.log('fetch-api.ts -- variables: ', variables);

  // Default options are marked with *
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      //https://graphql.org/graphql-js/graphql-clients/
      //'Content-Type': 'application/graphql',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // -errors for graphQl errors
  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }

  return { data }; // parses JSON response into native JavaScript objects
};

// ==============================================

export default fetchApi;
