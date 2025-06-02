import { Products } from '@/types/product';
import ProductCard from './ProductCard';

type ProductGridProps = {
  items: Products;
};

const ProductGrid = ({ items }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
