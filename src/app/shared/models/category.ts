export interface Category {
  name: string;
  subCategories: SubCategory[];
  routerLink: string;
}

export interface SubCategory {
  name: string;
  subCategories: SubCategory[];
}
