import { Products } from '@/types/product';
import ProductCard from './ProductCard';

type ProductListProps = {
  items: Products;
};

const ProductList = ({ items }: ProductListProps) => {
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
