import { AddProductRequestBody, Product } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export const productService = {
  async get(limit: number = 20): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}`);
    if (!res.ok) throw new Error('상품 로드 실패');
    const data = await res.json();
    return data.products;
  },
  async add(product: AddProductRequestBody): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error('상품 추가 실패');
    const data = await res.json();
    return data;
  },
};
