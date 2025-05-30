import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const ProductGrid = ({ items }: { items: Product[] }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
