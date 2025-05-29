export type Product = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  reviews: number;
  rating: number;
};

export type AddProductRequestBody = {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  brand: 'Apple' | 'Samsung' | 'Weebur';
};
