export type CategoryProductsResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
    description: string;
    price: number;
    qty: number;
    sku: string;
    image:string;
    view: number;
    isCatalog: boolean;
    category: {
      id: number;
      image: string;
      thumb: string;
      name: string;
      slug: string
    };
    isCustomPrice: false;
    location: {
      id: 1;
      name: string;
      flag:string;
    }[];
  }[];
  message: string;
};
