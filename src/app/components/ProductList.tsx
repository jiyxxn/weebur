import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <ul>
      {products.map((product) => (
        <li>
          <ProductCard key={product.id} product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
