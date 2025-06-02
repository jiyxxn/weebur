import { Products } from '@/types/product';
import SwitchCase from './SwitchCase';
import { useViewType } from '@/hooks/useViewType';
import ProductList from './ProductList';
import ProductGrid from './ProductGrid';

type RandomViewProps = {
  items: Products;
};

const RandomView = ({ items }: RandomViewProps) => {
  const viewType = useViewType();

  return (
    <SwitchCase
      value={viewType}
      cases={{
        list: <ProductList items={items} />,
        grid: <ProductGrid items={items} />,
      }}
      default={<ProductList items={items} />}
    />
  );
};

export default RandomView;
