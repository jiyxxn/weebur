import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const ProductList = ({ items }: { items: Product[] }) => {
  return (
    <ul className="flex flex-col gap-6">
      {items.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
