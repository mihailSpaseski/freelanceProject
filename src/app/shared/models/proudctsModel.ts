import { SubCategory } from "./category";

export interface productsModel {
    id?: string;
    name?: string | undefined;
    image?: string;
    description?: string;
    categoryName?: string;
    subCategories?: SubCategory[];
    routerLink?: string;
}