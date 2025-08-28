import React, { useEffect, useState } from "react";
import TableHead from "./TableHead";
import Select from "../forms/Select";
import {
  backward_arrow_icon,
  forward_arrow_icon,
} from "@/assets/icons/dashboard";

interface TableProps {
  children: React.ReactNode;
  headers: { title: string }[];
  pagination?: boolean;
  searchable?: boolean;
  initialMetaData?: TableMetaData;
  setFilter?: React.Dispatch<
    React.SetStateAction<Record<string, string | number | undefined>>
  >;
}

export type TableMetaData = {
  current_page?: number;
  first_page?: number;
  last_page?: number;
  limit?: number;
  total_items?: number;
  total_pages?: number;
};

const Table = ({
  children,
  setFilter,
  headers,
  searchable = true,
  pagination = true,
  initialMetaData = {},
}: TableProps) => {
  return (
    <>
      <div className="relative w-full overflow-auto max-h-[calc(73vh)] shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <TableHead setFilter={setFilter} searchable={searchable} headers={headers} />
          <tbody>{children}</tbody>
        </table>
      </div>
      {pagination && (
        <Pagination setFilter={setFilter} initialMetaData={initialMetaData} />
      )}
    </>
  );
};

export default Table;

const pageCount = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "25",
    value: "25",
  },
  {
    label: "50",
    value: "50",
  },
  {
    label: "100",
    value: "100",
  },
];

const Pagination = ({
  initialMetaData,
  setFilter,
}: {
  setFilter?: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  initialMetaData: TableMetaData;
}) => {
  const [metaData, setMetaData] = useState<TableMetaData>();
  
  useEffect(() => {
    setMetaData(initialMetaData)
  }, [initialMetaData]);
  
  const handleLimitChange = (e) => {
    if (!setFilter) return;
    const value = Number(e.target.value);
    setFilter((prev) => ({
      ...(prev || {}),
      limit: value,
      page: 1,
    }));
    setMetaData((prev) => ({
      ...prev,
      limit: value,
    }));
  };


  const handleNextClick = () => {
    if (!setFilter) return;
    const number = metaData?.current_page && metaData?.current_page + 1;
    setFilter((prev) => ({
      ...(prev || {}),
      page: number || 1,
    }));

    setMetaData((prev) => ({
      ...prev,
      current_page: number,
    }));
  };


  const handlePrevClick = () => {
    if (!setFilter) return;

    const currentPage = metaData?.current_page ?? 1;
    const newPage = currentPage > 1 ? currentPage - 1 : 1;

    setFilter((prev) => ({
      ...(prev || {}),
      page: newPage,
    }));

    setMetaData((prev) => ({
      ...prev,
      current_page: newPage,
    }));
  };
  const handlePageNumberClick = (number: number) => {
    if(!setFilter) return;
    setFilter((prev) => ({
      ...(prev || {}),
      page: number,
    }));

    setMetaData((prev) => ({
      ...prev,
      current_page: number,
    }));
  };


  return (
    <div className="flex justify-between items-center mt-3">
      <div className="w-[90px]">
        <Select
          onChange={handleLimitChange}
          placeholder="Pages"
          value={metaData?.limit?.toString() || "10"}
          noLabel={true}
          options={pageCount}
        />
      </div>

      <div className="flex rounded-md overflow-hidden gap-3 w-fit">
        <button
          disabled={1 >= (metaData?.current_page || 1) ? true : false}
          onClick={handlePrevClick}
          title="Show Prev Page"
          className="p-3 border-r-1 rounded-full w-[40px] bg-white px-3 text-gray-500 hover:bg-indigo-300 cursor-pointer hover:text-white"
        >
          {backward_arrow_icon}
        </button>

        {Array.from({ length: metaData?.total_pages || 1 }).map((_, index) => (
          <button
            title={`Show Data of ${index+1} Page`}
            disabled={metaData?.current_page == index+1}
            onClick={()=>handlePageNumberClick(index+1)}
            key={index + "-pagination-page"}
            className={` px-3 aspect-square w-[40px] border-r-1 rounded-full hover:bg-indigo-300 cursor-pointer hover:text-white ${
              metaData?.current_page == index + 1
                ? "bg-indigo-400 text-white hover:bg-indigo-400"
                : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
        disabled={metaData?.total_pages && metaData?.total_pages <= (metaData?.current_page || 1) ? true : false}
          onClick={handleNextClick}
          title="Show Next Page"
          className="p-3 bg-white rounded-full w-[40px] px-3 text-gray-500 hover:bg-indigo-300 cursor-pointer hover:text-white"
        >
          {forward_arrow_icon}
        </button>
      </div>
    </div>
  );
};
