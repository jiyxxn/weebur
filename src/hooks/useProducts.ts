import { getProducts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useProducts(limit: number = 20) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => getProducts(limit),
  });
}
