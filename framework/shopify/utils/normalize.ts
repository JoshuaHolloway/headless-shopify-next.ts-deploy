import {
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
} from '../schema';

import { Product } from '@common/types/product';

// ==============================================

function normalizeProductImages({ edges }: { edges: Array<ImageEdge> }) {
  // -input is ImageConnection
  // -we destructurize the edges, which are array of nodes
  // -we then destructure the nodes off of the edges in .map()
  // -on the node we destructure the originalSrc and alias it to url.
  // -We forward the remaining parameters

  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
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

const normalizeProductOption = ({
  id,
  values,
  name: displayName,
}: ProductOption) => {
  console.log('ID ', id);
  console.log('NAME ', displayName);
  console.log('VALUES ', values);

  const normalized = {
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      };

      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColor: value,
        };
      }

      return output;
    }),
  };

  return normalized;
};

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
    options,
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
    options: options
      ? options
          .filter((o) => o.name !== 'Title')
          .map((o) => normalizeProductOption(o))
      : [],
    ...rest,
  };

  return product;
}
