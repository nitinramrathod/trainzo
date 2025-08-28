import {search_icon } from "@/assets/icons/dashboard";
import React, { useRef } from "react";
// import Input from "../forms/Input";


const Input = ({...rest})=>{
  return(
  <div className="flex items-center bg-indigo-50 px-2 rounded-md shadow-sm border-1 hover:border-1 hover:border-indigo-300">
    <span className="text-xl text-indigo-500">{search_icon}</span>
    <input type="text" className="w-full font-medium p-2 outline-0" {...rest} />
  </div>
  )
}

interface TableHeadProps {
  headers: { title: string }[];
  searchable: boolean;
  setFilter?: React.Dispatch<
      React.SetStateAction<Record<string, string | number | undefined>>
    >;
}

const TableHead = ({ headers, searchable, setFilter }: TableHeadProps) => {
  const debounce = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e) => {
    
    if (!setFilter) return;
    const { name, value } = e.target;  
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      setFilter((prev) => ({
        ...(prev || {}),
        [name]: value,
      }));
    }, 500);
  };

  return (
    <thead >
      <tr className="text-xs bg-indigo-400 sticky top-0 z-10 text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        {headers?.map((item: { title: string }, index: number) => (
          <th
            key={item?.title + index}
            scope="col"
            className={`px-2 min-w-[60px] text-[.8rem] whitespace-nowrap py-3 font-bold text-white ${
              item?.title == "Action" ? "sticky right-0 bg-indigo-400" : ""
            }`}
          >
            {item.title}
          </th>
        ))}
      </tr>
      {searchable &&
      <tr className="bg-indigo-100">
        {headers?.map((item: { title: string, input?: string, name?: string }, index: number) => (
          <th
            key={item?.title + index}
            scope="col"
            className={`px-2 text-[.8rem] py-2 ${item?.title == "Action" ? "sticky right-0 bg-indigo-100" : ""}`}
          >
            {item?.input == 'text' && <Input name={item?.name} onChange={handleInputChange} placeholder={`Search ${item.title}`}></Input>}
          </th>
        ))}
      </tr>
      }
    </thead>
  );
};

export default TableHead;
