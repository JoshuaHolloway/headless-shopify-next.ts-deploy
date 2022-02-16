import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@mantine/core';

import s from './ProductCard.module.css';

// ==============================================

import { Product } from '@common/types/product';

interface Props {
  product: Product;
}
// ==============================================

const placeholder_img = '/product-img-placeholder.svg';

// ==============================================

const ProductCard: FC<Props> = ({ product }) => {
  console.log('product.images: ', product.images);

  return (
    <Link href={`/products/${product.slug}`}>
      <a className={s.root}>
        <div className={s.productBg}></div>
        <div className={s.productTag}>
          <h3 className={s.productTitle}>
            <span>{product.name}</span>
          </h3>
          <span className={s.productPrice}>$ {product.price.value}</span>
          <Button
            onClick={() => {
              alert('TOODO: Wire up buy!');
            }}
          >
            Buy
          </Button>
        </div>

        {product.images && (
          <Image
            className={s.productImage}
            alt={product.name ?? 'Product image'}
            src={product.images[0]?.url ?? placeholder_img}
            height={540}
            width={540}
            quality='85'
            layout='responsive'
          />
        )}
      </a>
    </Link>
  );
};

// ==============================================

export default ProductCard;
