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

  const paths = products.map((p) => ({ params: { slug: p.slug } }));

  console.log('[slug].tsx -- getStaticPaths() -- paths: ', paths);

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
}: GetStaticPropsContext<any>) => {
  // }: GetStaticPropsContext<{ slug: string }>) => {

  const { slug } = params;

  console.log('[slug].tsx -- getStaticProps() -- slug:', slug);

  const config = getConfig();
  const { product } = await getProduct({
    config,
    // variables: { slug: params?.slug },
    variables: { slug },
  });

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
