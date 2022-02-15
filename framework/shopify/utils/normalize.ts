import { ImageEdge, MoneyV2, Product as ShopifyProduct } from '../schema';

import { Product } from '@common/types/product';

// ==============================================

function normalizeProductImages({ edges }: { edges: Array<ImageEdge> }) {
  // -input is ImageConnection
  // -we destructurize the edges, which are array of nodes
  // -we then destructure the nodes off of the edges in .map()
  // -on the node we destructure the originalSrc and alias it to url.
  // -We forward the remaining parameters

  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    console.log('url: ', url);

    return {
      url, //: `/images/${url}`,
      ...rest,
    };
  });
}

// ==============================================

function normalizeProductPrice({ currencyCode, amount }: MoneyV2) {
  return {
    value: +amount, // convert string -> number
    currencyCode,
  };
}

// ==============================================

export function normalizeProduct(productNode: ShopifyProduct): Product {
  // -Input product from the backend
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    priceRange,
    ...rest
  } = productNode;

  // -Output product to use on the frontend
  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ''), // remove all slashed from beginning and end
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    ...rest,
  };

  return product;
}
