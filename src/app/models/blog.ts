import { Category } from "./category";

export interface Blog {
  id?: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  author: string;
  email: string;
  categories: Category[];
}