export type ProductResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    description: string;
    qty: number;
    sku: string;
    image: string;
    images: string[];
    view: number;
    category: {
      id: number;
      image: string;
      thumb: string;
      name: string;
      slug: string;
    };
    'is_catalog': boolean;
    'is_custom_price': boolean;
    'is_favorite': boolean;
    'favorite_id': number;
    location: {
      id: number;
      name: string;
      flag: string;
    }[];
    price: number;
  };
  message: string;
};
