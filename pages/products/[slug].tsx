import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { getConfig } from '@framework/api/config';
import { Layout } from '@components/common';
import { getProduct, getAllProductsPaths } from '@framework/product';

// ==============================================

// fetch all of the product slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig();
  const { products } = await getAllProductsPaths(config);

  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    // paths: [
    //   { params: { slug: 'black-hat' } },
    //   { params: { slug: 't-shirt' } },
    //   { params: { slug: 'lightweight-jacket' } },
    // ],
    fallback: false,
  };
};

// ==============================================

// provide product specific data to the page
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig();
  const { product } = await getProduct(config);

  return { props: { product } };
};

// ==============================================

export default function ProductSlug({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <>
      <div>Product Name: {product.name}</div>
      <div>Products Slug {product.slug}</div>
    </>
  );
}

// ==============================================

ProductSlug.Layout = Layout;
