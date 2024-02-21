import { Button, Input, TableColumnsType, TableColumnType } from "antd";
import { DataIndex, ITableNewsColumns } from "../interfaces/table-news-columns";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

export function getTableNewsColumns(): TableColumnsType<ITableNewsColumns> {
  //Событие поиска записей
  const handleSearch = (confirm: FilterDropdownProps["confirm"]) => {
    confirm();
  };
  //Событие сброса поиска
  const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps["confirm"]) => {
    clearFilters();
    confirm();
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): TableColumnType<ITableNewsColumns> => ({
    filterDropdown: ({
      setSelectedKeys,

      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Поиск...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(confirm)}
          size="small"
          style={{ width: 90 }}
        >
          Поиск
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters,confirm)}
          size="small"
          style={{ width: 90 }}
        >
          Сбросить
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  return [
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Краткое описание",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Дата публикации",
      dataIndex: "publishedAt",
      key: "publishedAt",
      sorter:(a,b)=> new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    },
    {
      title: "Действия",
      render: (_, record,index) => (
          <Link to={`news/${index}`} >Читать далее...</Link>
      ),
      key: "action",
    },
  ];
}

