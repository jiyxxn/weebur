'use client';

import { useProducts } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';
import RandomView from '../components/RandomView';
import ProductList from '../components/ProductList';
import ProductGrid from '../components/ProductGrid';

const ProductListPage = () => {
  const router = useRouter();
  const { data: products, isLoading, error } = useProducts(20);

  if (isLoading) return <div>로딩중 ...</div>;
  if (error || !products) return <div>에러 발생</div>;
  return (
    <section className="p-10">
      <h2 className="sr-only">상품 목록 페이지</h2>
      <button
        type="button"
        onClick={() => router.push('/products/new')}
        className="p-4 bg-neutral-700 text-white rounded-full mb-8 ">
        상품 등록 바로가기
      </button>

      <RandomView
        list={<ProductList items={products} />}
        grid={<ProductGrid items={products} />}
      />
    </section>
  );
};

export default ProductListPage;
