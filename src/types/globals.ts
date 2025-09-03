export interface Blog {
  slug: string;
  slugAsParams: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  image?: string;
  author: string;
  body: string;
}
