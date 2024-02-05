export interface Category {
  name: string;
  subCategories: SubCategory[];
  routerLink: string;
}

export interface SubCategory {
  name: string;
  subCategories: SubCategory[];
}

export interface DisplayItems {
  id: string;
  name: string;
  image: string;
  description: string;
  categoryName: string;
}