import {Card, Spin, Table} from "antd";
import { ITableNewsColumns } from "../interfaces/table-news-columns";
import DropdownHideColumns from "../components/DropdownHideColumns";
import React, { useState } from "react";

import { getTableNewsColumns } from "../constants/table-news-constant";
import { useNewsState } from "../store/store";

export default function TableNews() {
  const columns = getTableNewsColumns();
  //Все колонки по умолчанию
  const defaultCheckedList = columns.map((column) => column.key as string);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [isLoading, setIsLoading] = useState(true);
  const news = dataPipe(
    useNewsState((state) => {
      state.getNews(setIsLoading);
      return state.news.articles;
    }),
  );

  // Новые измененные колонки
  const newColumns = columns.map((column) => ({
    ...column,
    hidden: !checkedList.includes(column.key as string),
  }));
  // Событие изменения колонок
  const handlerChangeColumns = (value: string[]) => {
    setCheckedList(value);
  };

  return (
    <Card title='Dynamic TableNews'>
      <DropdownHideColumns
        onChange={handlerChangeColumns}
        columns={columns}
        defaultCheckedList={defaultCheckedList}
      ></DropdownHideColumns>
      <Spin spinning={isLoading} tip={"Загрузка"}>
      <Table dataSource={news} columns={newColumns}></Table>
      </Spin>
    </Card>
  );
  //Функция изменения исходных данных
  function dataPipe(data: ITableNewsColumns[]) {
    return data?.map((article) => ({
      ...article,
      publishedAt: new Date(article.publishedAt).toDateString(),
    }));
  }
}
