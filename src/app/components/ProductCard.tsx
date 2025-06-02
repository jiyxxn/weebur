import { Product } from '@/types/product';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article className="p-4 border-2 border-gray-300 rounded-lg space-y-2">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
      />
      <h3>상품명 : {product.title}</h3>
      <div className="space-y-2">
        <p>상품 설명 : {product.description}</p>
        <p>별점 : {product.rating}</p>
        <p>리뷰 수 : {product.reviews.length}</p>
      </div>
    </article>
  );
};

export default ProductCard;
