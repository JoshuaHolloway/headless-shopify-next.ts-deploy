import { ApiConfig } from '@common/types/api';
import { getProductQuery } from '@framework/utils';

// ==============================================

import { Product } from '@common/types/product';

// ==============================================

const getProduct = async (options: {
  config: ApiConfig;
  variables: any;
}): Promise<any> => {
  const { config, variables } = options;

  console.log('get-products.ts -- variables: ', variables);

  const { data } = await config.fetch<{ product: Product }>({
    query: getProductQuery,
    url: config.apiUrl,
    variables,
  });

  // console.log(JSON.stringify(data, null, 2));

  return {
    product: {
      name: data?.productByHandle?.title,
      slug: 'my-super-product',
    },
  };
};

// ==============================================

export default getProduct;
