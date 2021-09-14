import axios from 'axios';
import { CategoriesResponse } from '@/types/CategoriesResponse';
import { CategoryProductsResponse } from '@/types/CategoryProductsResponse';

export default class HomePM {
  categories: CategoriesResponse['data'] = [];

  async hydrate(): Promise<void> {
    await this.hydrateCategories();
    await this.hydrateSomeProducts();
    console.log(this.categories[0]);
  }

  async hydrateCategories(): Promise<void> {
    const response = await axios.get<CategoriesResponse>('http://khair-elkhalij.com/api/categories');

    if (response) {
      this.categories = response.data.data.map((category) => ({ ...category, products: [] }));
    }
  }

  async hydrateSomeProducts(): Promise<void> {
    for (let i = 0; i < this.categories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get<CategoryProductsResponse>(
        `http://khair-elkhalij.com/api/categories/${this.categories[i].slug}`,
      );

      if (response) {
        this.categories[i].products = response.data.data.slice(0, 3);
      }
    }
  }
}
