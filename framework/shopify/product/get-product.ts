import { getProductQuery, normalizeProduct } from '@framework/utils';

// ==============================================

import { ApiConfig, Variables } from '@common/types/api';
import { Product as ShopifyProduct } from '@framework/schema';
import { Product } from '@common/types/product';

// ==============================================

type FetchType = {
  productByHandle: ShopifyProduct;
  // -name of query is productByHandle
  // -ShopifyProduct is the type of the product returned from server
};

type ReturnType = {
  product: Product | null;
};

// ==============================================

const getProduct = async (options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<ReturnType> => {
  const { config, variables } = options;

  console.log('get-products.ts -- variables: ', variables);

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    url: config.apiUrl,
    variables,
  });

  console.log(JSON.stringify(data.productByHandle, null, 2));

  const { productByHandle } = data;

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
    // {
    // name: 'name', //data?.productByHandle?.title,
    // slug: 'my-super-product',
    // },
  };
};

// ==============================================

export default getProduct;
