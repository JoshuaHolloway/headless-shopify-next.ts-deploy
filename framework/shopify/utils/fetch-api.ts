// ==============================================

import { FetcherResults, ApiFetcherOptions } from '@common/types/api';

// ==============================================

// -Returns a Promise with {data: T}, where T is specified when we use fetchApi<T>()
const fetchApi = async <T>({
  url,
  query,
}: ApiFetcherOptions): Promise<FetcherResults<T>> => {
  // Default options are marked with *
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
    body: query,
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
