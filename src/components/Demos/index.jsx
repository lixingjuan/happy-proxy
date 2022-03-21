import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: <span style={{ fontSize: "18px" }}>Joe</span>,
        value: "Joe",
      },
      {
        text: <span style={{ fontSize: "18px" }}>Jim</span>,
        value: "Jim",
      },
    ],
    filterMultiple: true,
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => {
      console.log({ value, record });
      return record.address.includes(value);
    },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

export default function Index() {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
