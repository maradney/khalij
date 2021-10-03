import axios from 'axios';
import { CategoriesResponse } from '@/types/CategoriesResponse';
import { CategoryProductsResponse } from '@/types/CategoryProductsResponse';

export default class HomePM {
  categories: CategoriesResponse['data'] = [];

  products: CategoryProductsResponse['data'] = [];

  async hydrate(): Promise<void> {
    await this.hydrateCategories();
    await this.hydrateSomeProducts();
  }

  async hydrateCategories(): Promise<void> {
    const response = await axios.get<CategoriesResponse>('http://khair-elkhalij.com/api/categories');

    if (response) {
      this.categories = response.data.data;
    }
  }

  async hydrateSomeProducts(): Promise<void> {
    const response = await axios.get<CategoryProductsResponse>(
      'http://khair-elkhalij.com/api/products',
    );

    if (response) {
      this.products = response.data.data.slice(0, 3);
    }
  }
}
