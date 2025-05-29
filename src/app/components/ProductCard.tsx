import { Product } from '@/types/product';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <article>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <div>
        <p>{product.description}</p>
        <p>{product.rating}</p>
        <p>{product.reviews}</p>
      </div>
    </article>
  );
};

export default ProductCard;
