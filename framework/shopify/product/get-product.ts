import { ApiConfig } from '@common/types/api';
import { getProductQuery } from '@framework/utils';

// ==============================================

import { Product } from '@common/types/product';

// ==============================================

const getProduct = async (config: ApiConfig): Promise<any> => {
  const { data } = await config.fetch<{ product: Product }>({
    query: getProductQuery,
    url: config.apiUrl,
  });

  console.log(JSON.stringify(data, null, 2));

  return {
    product: {
      name: 'my super product',
      slug: 'my-super-product',
    },
  };
};

// ==============================================

export default getProduct;
