export type Product = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  reviews: Review[];
  rating: number;
};

export type Products = Product[];

export type AddProductRequestBody = {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: 'Apple' | 'Samsung' | 'Weebur';
};

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
