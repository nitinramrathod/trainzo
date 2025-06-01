import React from 'react'

interface TableHeadProps {
    headers: { title: string }[];
}

const TableHead = ({
    headers
}: TableHeadProps) => {
  return (
    <thead className="text-xs bg-indigo-400 text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
    <tr>
        {headers?.map((item: { title: string }, index: number) => (
          <th key={item?.title + index} scope="col" className="px-6 text-[.8rem] py-3 font-bold text-white">
            {item.title}
          </th>
        ))}
    </tr>
</thead>
  )
}

export default TableHead