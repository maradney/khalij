export type CartResponse = {
  success: boolean;
  data: {
    products: {
      count: number;
      note: string;
      price: number;
      id: number;
      name: string;
      description: string;
      qty: number;
      sku: string;
      image: string;
      view: number;
      category: {
        id: number;
        image: string;
        thumb: string;
        name: string;
        slug: string;
      },
      location: {
        id: number;
        name: string;
        flag: string;
      }[]
      'product_id': number;
      'location_id': number;
      'is_catalog': boolean;
      'is_custom_price': boolean;
    }[];
    additional: number;
    total: number;
    'sub_total': number;
  };
  message: string;
};
