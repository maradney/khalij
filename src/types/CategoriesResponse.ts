export type CategoriesResponse = {
  success: boolean;
  data: {
    id: number;
    image: string;
    thumb: string;
    name: string;
    slug: string;
  }[];
  message: string;
};
