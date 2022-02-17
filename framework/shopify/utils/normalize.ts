import {
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
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

const normalizeProductVariants = (connection: ProductVariantConnection) => {
  const { edges } = connection;

  const variants = edges.map((edge) => {
    const { node } = edge;
    const { id, title, sku, selectedOptions, priceV2, compareAtPriceV2 } = node;
    return {
      id,
      name: title,
      sku: sku ?? id, // if sku is not defined then return the id
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
    };
  });

  return variants;
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
    variants,
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
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest,
  };

  return product;
}
