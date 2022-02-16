import { Layout } from '@components/common';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from 'next';

// ==============================================

// fetch all of the product slugs
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: 'black-hat' } },
      { params: { slug: 't-shirt' } },
      { params: { slug: 'lightweight-jacket' } },
    ],
    fallback: false,
  };
};

// ==============================================

// provide product specific data to the page
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  return { props: { product: { slug: params?.slug } } };
};

// ==============================================

export default function ProductSlug({
  product,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return <div>Products Slug {product.slug}</div>;
}

// ==============================================

ProductSlug.Layout = Layout;
