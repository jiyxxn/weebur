import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
