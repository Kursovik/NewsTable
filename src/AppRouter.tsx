import App from "./App";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NewsItem from "./components/news-item/NewsItem";
import TableNews from "./table-news/TableNews";

export const appRouter = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <TableNews />,
      },
      {
        path: "news/:articleId",
        element: <NewsItem />,
      },
    ],
  },
]);
