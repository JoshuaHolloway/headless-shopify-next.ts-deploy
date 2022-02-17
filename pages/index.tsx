import type { InferGetStaticPropsType } from 'next';

import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import { Grid } from '@components/ui';

import { getConfig } from '@framework/api/config';
import { getAllProducts } from '@framework/product';

// ==============================================

export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts(config);

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 4, // every 4-hours
  };
}

// ==============================================

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Grid layout='A'>
      {products.slice(0, 3).map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </Grid>
  );
}
// ==============================================

Home.Layout = Layout;
