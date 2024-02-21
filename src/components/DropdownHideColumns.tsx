import { Select, SelectProps, TableColumnType } from "antd";
import { ITableNewsColumns } from "../interfaces/table-news-columns";
export default function DropdownHideColumns({ onChange, columns, defaultCheckedList }: any) {
  const handleSelectChange = (value: string[]) => {
    onChange(value);
  };
  return (
    <div>
      <Select
        mode={"multiple"}
        style={{ width: "30%" }}
        placeholder={"Выберите столбцы"}
        maxTagCount={"responsive"}
        options={getOptions()}
        defaultValue={defaultCheckedList}
        onChange={handleSelectChange}
      ></Select>
    </div>
  );
  function getOptions(): SelectProps["options"] {
    return columns.map((column: TableColumnType<ITableNewsColumns>) => ({
      label: <span>{column.title as string}</span>,
      value: column.key as string,
    }));
  }
}
