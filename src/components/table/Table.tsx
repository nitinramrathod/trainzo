import React from "react";
import TableHead from "./TableHead";
import Select from "../forms/Select";

interface TableProps {
  children: React.ReactNode;
  headers: { title: string }[];
}

const Table = ({ children, headers }: TableProps) => {
  return (
    <div>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHead headers={headers} />
          <tbody>{children}</tbody>
        </table>
      </div>

      <Pagination />
    </div>
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

const Pagination = ({currentPage = 2}) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="w-[90px]">
        <Select placeholder='Pages' noLabel={true} options={pageCount} />
      </div>

      <div className="flex rounded-md overflow-hidden shadow-md bg-indigo-100 w-fit">
        <button className="p-1 bg-indigo-400 px-3 text-white">Prev</button>
        <button className={` px-3 ${currentPage == 1 ? 'bg-indigo-400 text-white' :'bg-white'}`}>1</button>
        <button className={` px-3 ${currentPage == 2 ? 'bg-indigo-400 text-white' :'bg-white'}`}>2</button>
        <button className={` px-3 ${currentPage == 3 ? 'bg-indigo-400 text-white' :'bg-white'}`}>3</button>
        <button className="p-1 bg-indigo-400 px-3 text-white">Next</button>
      </div>
    </div>
  );
};
