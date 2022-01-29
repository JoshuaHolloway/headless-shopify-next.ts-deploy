import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <Link href={`/product/${product.slug}`}>
      <a className=''>
        <div>
          <h3>
            <span>{product.name}</span>
          </h3>
          <span>$ 14</span>
        </div>

        {product.images && (
          <Image
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
