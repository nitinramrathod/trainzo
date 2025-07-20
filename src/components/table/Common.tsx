import React from "react";
interface TrProps {
  children?: React.ReactNode;
  className?: string;
}

type TDProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  children?: React.ReactNode;
  className?: string;
};

function TR({ children, className }: TrProps) {
  return (
    <tr
      className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ${
        className ?? ""
      }`}
    >
      {children}
    </tr>
  );
}

function TD({ children, className, ...rest }: TDProps) {
  return (
    <td className={`px-6 py-4 ${className || ''}`} {...rest}>
      {children || '--'}
    </td>
  );
}

function ActionTD({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 bg-white sticky right-0 ${className}`}>
      <div className="flex justify-center items-center">{children || "--"}</div>
    </td>
  );
}

export { TR, TD, ActionTD };
