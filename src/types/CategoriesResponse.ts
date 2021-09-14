import { CategoryProductsResponse } from '@/types/CategoryProductsResponse';

export type CategoriesResponse = {
  success: boolean;
  data: {
    id: number;
    image: string;
    thumb: string;
    name: string;
    slug: string;
    products: CategoryProductsResponse['data'];
  }[];
  message: string;
};
