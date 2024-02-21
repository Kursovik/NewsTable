

export interface ITableNewsColumns {
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  content: string;
  source: {
    id: string;
    name: string;
  };
}
export interface ITableNews {
  status: string;
  totalResults: number;
  articles: Array<ITableNewsColumns>;
}
export type DataIndex = keyof Omit<ITableNewsColumns, "source">;
