import React from "react";
import TableHead from "./TableHead";
import Select from "../forms/Select";
import { backward_arrow_icon, forward_arrow_icon } from "@/assets/icons/dashboard";

interface TableProps {
  children: React.ReactNode;
  headers: { title: string }[];
  pagination?: boolean;
  searchable?: boolean;
  metaData?: TableMetaData;
}

export type TableMetaData = {
    current_page?: number;
    first_page?: number;
    last_page?: number;
    limit?: number;
    total_items?: number;
    total_pages?: number;
};

const Table = ({ children, headers, searchable=true, pagination = true, metaData={} }: TableProps) => {
  return (
    <>
      <div className="relative w-full overflow-auto max-h-[calc(73vh)] shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHead searchable={searchable} headers={headers} />
          <tbody>{children}</tbody> 
        </table>
      </div>
      {pagination && <Pagination metaData={metaData} />}
      
    </>
  );
};

export default Table;

const pageCount = [
    {
        label: '10',
        value: '10'
    },
    {
        label: '25',
        value: '25'
    },
    {
        label: '50',
        value: '50'
    },
    {
        label: '100',
        value: '100'
    }
]

const Pagination = ({ metaData }: { metaData: TableMetaData }) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="w-[90px]">
        <Select placeholder='Pages' value={metaData?.limit?.toString() || '10'} noLabel={true} options={pageCount} />
      </div>

      <div className="flex rounded-md overflow-hidden gap-3 w-fit">
        <button className="p-3 border-r-1 rounded-full w-[40px] bg-white px-3 text-gray-500 hover:bg-indigo-300 cursor-pointer hover:text-white">{backward_arrow_icon}</button>
       
        {Array.from({length: metaData?.total_pages || 1}).map((_, index) => (
          <button key={index + '-pagination-page'} className={` px-3 aspect-square w-[40px] border-r-1 rounded-full hover:bg-indigo-300 cursor-pointer hover:text-white ${metaData?.current_page == index+1 ? 'bg-indigo-400 text-white hover:bg-indigo-400' :'bg-white'}`}>{index+1}</button>
        ))}
        <button className="p-3 bg-white rounded-full w-[40px] px-3 text-gray-500 hover:bg-indigo-300 cursor-pointer hover:text-white">{forward_arrow_icon}</button>
      </div>
    </div>
  );
};
