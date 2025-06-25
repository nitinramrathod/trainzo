import {search_icon } from "@/assets/icons/dashboard";
import React from "react";
// import Input from "../forms/Input";


const Input = ({placeholder})=>{
  return(
  <div className="flex items-center bg-indigo-50 px-2 rounded-md shadow-sm">
    <span className="text-xl text-indigo-500">{search_icon}</span>
    <input type="text" className="font-medium p-2 outline-0" placeholder={placeholder} />
  </div>
  )
}

interface TableHeadProps {
  headers: { title: string }[];
}

const TableHead = ({ headers }: TableHeadProps) => {
  return (
    <thead >
      <tr className="text-xs bg-indigo-400 sticky top-0 z-10 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        {headers?.map((item: { title: string }, index: number) => (
          <th
            key={item?.title + index}
            scope="col"
            className={`px-2 text-[.8rem] min-w-[60px] py-3 font-bold text-white ${
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
            className={`px-2 text-[.8rem] py-2 ${item?.title == "Action" ? "sticky right-0 bg-indigo-100" : ""}`}
          >
            {item?.input == 'text' && <Input placeholder={`Enter ${item.title}`}></Input>}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
