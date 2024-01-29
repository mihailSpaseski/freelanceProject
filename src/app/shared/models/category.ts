export interface Category{
  key: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  name: string;
  role: number;
  subCategories: SubCategory[];
}
