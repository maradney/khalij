import axios from 'axios';
import { CartResponse } from '@/types/CartResponse';

export default class CartPM {
  cart: CartResponse['data'] = {
    products: [],
    additional: 0,
    total: 0,
    sub_total: 0,
  };

  cartActionLoading = false;

  async hydrate(): Promise<void> {
    await this.hydrateCart();
  }

  async hydrateCart(): Promise<void> {
    const response = await axios.get<CartResponse>(
      'http://khair-elkhalij.com/api/cart',
    );
    if (response) {
      this.cart = response.data.data;
    }
  }

  addToCart = async (
    cartItem: { id: number; count: number; locationId: number; price: number; note?: string; },
  ): Promise<void> => {
    await axios.post<CartResponse>(
      'http://khair-elkhalij.com/api/cart',
      {
        product_id: cartItem.id,
        count: cartItem.count,
        location_id: cartItem.locationId,
        price: cartItem.price,
        note: cartItem.note,
      },
    );
  }

  updateCart = async (
    cartItem: { id: number; productId: number; count: number; locationId: number; price: number; note?: string; },
  ): Promise<void> => {
    await axios.post<CartResponse>(
      `http://khair-elkhalij.com/api/cart/${cartItem.id}`,
      {
        product_id: cartItem.productId,
        count: cartItem.count,
        location_id: cartItem.locationId,
        price: cartItem.price,
        note: cartItem.note,
        _method: 'PATCH',
      },
    );
  }

  deleteCart = async (
    cartItemId: number,
  ): Promise<void> => {
    await axios.post<CartResponse>(
      `http://khair-elkhalij.com/api/cart/${cartItemId}`,
      {
        _method: 'DELETE',
      },
    );
  }
}
