import axios from 'axios';
import { CategoriesResponse } from '@/types/CategoriesResponse';
import { CategoryProductsResponse } from '@/types/CategoryProductsResponse';

export default class HomePM {
  categories: CategoriesResponse['data'] = [];

  products: CategoryProductsResponse['data'] = [];

  areProductsLoading = false;

  areCategoriesLoading = false;

  selectedCategory = '';

  async hydrate(category: string): Promise<void> {
    this.areProductsLoading = true;
    this.areCategoriesLoading = true;
    await this.hydrateCategories();
    if (category) {
      this.selectedCategory = category;
      await this.loadProducts(category);
    } else {
      await this.hydrateSomeProducts();
    }
  }

  async hydrateCategories(): Promise<void> {
    const response = await axios.get<CategoriesResponse>('http://khair-elkhalij.com/api/categories');

    if (response) {
      this.categories = response.data.data;
      this.areCategoriesLoading = false;
    }
  }

  async hydrateSomeProducts(): Promise<void> {
    const response = await axios.get<CategoryProductsResponse>(
      'http://khair-elkhalij.com/api/products',
    );

    if (response) {
      this.products = response.data.data;
      this.areProductsLoading = false;
    }
  }

  async loadProducts(category: string): Promise<void> {
    this.selectedCategory = category;
    this.areProductsLoading = true;
    this.products = [];

    const response = await axios.get<CategoryProductsResponse>(
      `http://khair-elkhalij.com/api/categories/${category}`,
    );

    if (response) {
      this.products = response.data.data;
      this.areProductsLoading = false;
    }
  }
}
