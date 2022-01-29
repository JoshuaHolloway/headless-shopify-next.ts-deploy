import { normalizeProduct, getAllProductsQuery } from '../utils';

// ==============================================

import { Product } from '@common/types/product';
import { ProductConnection } from '../schema';
import { ApiConfig } from '@common/types/api';

type ReturnType = {
  products: ProductConnection;
};

// ==============================================

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  });

  const products =
    data.products.edges.map((edge) => normalizeProduct(edge.node)) ?? [];

  return products;
};

// ==============================================

export default getAllProducts;