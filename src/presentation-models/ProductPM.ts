import axios from 'axios';
import { ProductResponse } from '@/types/ProductResponse';

interface ProductPMOptions {
  productId: number;
}

export default class ProductPM {
  private readonly productId: number;

  public product: ProductResponse['data'] = {
    id: 0,
    name: '',
    description: '',
    qty: 0,
    sku: '',
    image: '',
    images: [],
    view: 0,
    is_catalog: false,
    category: {
      id: 0,
      image: '',
      thumb: '',
      name: '',
      slug: '',
    },
    is_custom_price: false,
    is_favorite: false,
    favorite_id: 0,
    location: [],
    price: 0,
  };

  public cartForm = {
    locationId: 0,
    count: 0,
    price: 0,
    notes: '',
  };

  isProductLoading = false;

  canAddToCart = true;

  constructor({ productId }: ProductPMOptions) {
    this.productId = productId;
  }

  async hydrate(): Promise<void> {
    await this.hydrateProduct();
  }

  async hydrateProduct(): Promise<void> {
    this.isProductLoading = true;
    const response = await axios.get<ProductResponse>(
      `http://khair-elkhalij.com/api/products/${this.productId}`,
    );
    this.product = response.data.data;
    this.isProductLoading = false;
  }

  async addToCart(): Promise<void> {
    this.isProductLoading = true;
    const response = await axios.get<ProductResponse>(
      `http://khair-elkhalij.com/api/products/${this.productId}`,
    );
    this.product = response.data.data;
    this.isProductLoading = false;
  }
}
