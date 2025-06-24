import React from "react";

interface LoaderProps {
  cols?: number;
  rows?: number;
}

const TableLoader: React.FC<LoaderProps> = ({ rows = 16, cols = 6 }) => {
  return Array.from({ length: rows }).map((_, index) => (
    <tr key={`${index}-tr`} className="bg-white">
      {Array.from({ length: cols }).map((_, index) => (
        <td className={`p-1 bg-white ${cols == ++index ? "sticky right-0 bg-white": ""}`} key={`${index}-td`}>
          <div className="h-7 w-full bg-indigo-100 animate-pulse"></div>
        </td>
      ))}
    </tr>
  ));
};

export default TableLoader;
