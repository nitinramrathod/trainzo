import React from "react";
import Input from "../forms/Input";

interface TableHeadProps {
  headers: { title: string }[];
}

const TableHead = ({ headers }: TableHeadProps) => {
  return (
    <thead >
      <tr className="text-xs bg-indigo-400 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        {headers?.map((item: { title: string }, index: number) => (
          <th
            key={item?.title + index}
            scope="col"
            className={`px-2 text-[.8rem] py-3 font-bold text-white ${
              item?.title == "Action" ? "sticky right-0 bg-indigo-400" : ""
            }`}
          >
            {item.title}
          </th>
        ))}
      </tr>
      <tr className="bg-indigo-100">
        {headers?.map((item: { title: string, input?: string }, index: number) => (
          <th
            key={item?.title + index}
            scope="col"
            className={`px-2 text-[.8rem] py-2`}
          >
            {item?.input == 'text' && <Input noLabel={true} placeholder={`Enter ${item.title}`}></Input>}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
