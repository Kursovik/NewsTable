import create from "zustand";
import { ITableNews } from "../interfaces/table-news-columns";
import axios from "axios";

interface NewsState {
  news: ITableNews;
  getNews: (setIsLoading: (loading:boolean)=> void) => void;
}
const apiKey = "ef4593a322a44572908c240c967fa303";
export const useNewsState = create<NewsState>((set) => ({
  news: {
    status: "ok",
    totalResults: 10,
    articles: [
      {
        source: {
          id: "techcrunch",
          name: "TechCrunch",
        },
        author: "Sarah Perez",
        title:
          "Spam attack on Twitter/X rival Mastodon highlights 'Fediverse' vulnerabilities | TechCrunch",
        description:
          "A spam attack that impacted the open source X rival Mastodon, Misskey, and other apps highlights how the decentralized social web, also known as the",
        urlToImage:
          "https://techcrunch.com/wp-content/uploads/2023/11/moz_WhatisMastodon_1200x800-1-1-2048x1365-1.jpg?resize=1200,800",
        publishedAt: "2024-02-20T16:39:19Z",
        content:
          "A spam attack that impacted the open source X rival Mastodon, Misskey, and other apps highlights how the decentralized social web, also known as the Fediverse, is open to abuse. Over the past several… [+4985 chars]",
      },
    ],
  },
  getNews: async (setIsLoading) => {
    try {
      console.log('444');
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`,
      );
      setIsLoading(false)
      set({
        news: res.data,
      });
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  },
}));
