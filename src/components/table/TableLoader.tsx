import React from "react";

interface LoaderProps {
  cols?: number;
  rows?: number;
}

const TableLoader: React.FC<LoaderProps> = ({ rows = 10, cols = 6 }) => {
  return Array.from({ length: rows }).map((_, index) => (
    <tr key={`${index}-tr`} className="bg-white">
      {Array.from({ length: cols }).map((_, index) => (
        <td className="py-2.5 p-1.5" key={`${index}-td`}>
          <div className="h-7 w-full bg-gray-300 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  ));
};

export default TableLoader;
