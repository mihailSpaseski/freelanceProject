import { SubCategory } from "./category";

export interface Product {
    key: string;
    name: string;
    image: string;
    description: string;
    categoryName: string;
    publishedBy: string;
    username: string;
}
