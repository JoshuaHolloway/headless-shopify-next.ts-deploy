import getAllProductsPathsQuery from '@framework/utils/queries/get-all-products-paths';

// ==============================================

import { ProductConnection } from '@framework/schema';
import { ApiConfig } from '@common/types/api';
import { Product } from '@common/types/product';

type ReturnType = {
  products: Pick<Product, 'slug'>[];
};

// ==============================================

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<{ products: ProductConnection }>({
    query: getAllProductsPathsQuery,
    url: config.apiUrl,
  });

  // const products = data.products.edges.map(({ node: { handle } }) => {});
  const products = data.products.edges.map((product) => {
    const node = product.node;
    const handle = node.handle;
    return { slug: handle };
  });

  return {
    // products: [
    //   { slug: 'black-hat' },
    //   { slug: 't-shirt' },
    //   { slug: 'lightweight-jacket' },
    // ],
    products,
  };
};

// ==============================================

export default getAllProductsPaths;
