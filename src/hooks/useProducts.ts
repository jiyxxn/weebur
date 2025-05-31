import { productService } from '@/services/productService';
import { AddProductRequestBody, Product } from '@/types/product';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetProducts(limit: number = 20) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => productService.get(limit),
  });
}

export function useAddProduct() {
  return useMutation({
    mutationFn: (product: AddProductRequestBody) => productService.add(product),
  });
}
