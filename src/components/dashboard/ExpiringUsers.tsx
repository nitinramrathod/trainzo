import React from "react";
import Table from "../table/Table";
import Image from "next/image";
import { Users } from "lucide-react";
import NoDataFound from "../table/NoDataFound";

export const DaysLeft = ({ days }: { days: number }) => {
  const isExpired = days < 0;
  const absDays = Math.abs(days);
  const label =
    absDays === 1 ? "Day" : "Days";

  return (
    <span className={`font-semibold ${isExpired ? "text-red-500" : "text-green-500"}`}>
      {isExpired
        ? `Expired ${absDays} ${label} ago`
        : `${days} ${label} left`}
    </span>
  );
};

export const StatusIndicator = ({ days }: { days: number }) => {
  const isExpired = days < 0;

  return (
    <>
      {isExpired ? (
        <div className="bg-red-100 text-red-800 flex items-center gap-2 px-3 py-1 rounded-xl">
          Expired
          <i className="inline-block bg-red-500 w-3 h-3 rounded-full"></i>
        </div>
      ) : (
        <div className="bg-green-100 text-green-800 flex items-center gap-2 px-3 py-1 rounded-xl">
          Expiring
          <i className="animate-pulse inline-block bg-green-500 w-3 h-3 rounded-full"></i>
        </div>
      )}
    </>
  );
};

const headers = [
  {
    title: "Image",
  },
  {
    title: "Name",
  },
  {
    title: "Days Left",
  },
  {
    title: "Status",
  },
  {
    title: "Start Date",
  },
  {
    title: "End Date",
  }  
];
const ExpiringUsers = ({ data }) => {
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <Table searchable={false} pagination={false} headers={headers}>
        {data?.data?.length > 0 ?
          data?.data?.map((item) => (
            <tr
              key={item?._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-3 ">
                <Image
                    src={item?.photo ? `${item?.photo}` : '/images/form/avatar.jpg'}
                    alt={item?.name || "--"}
                    width={40}
                    height={40}
                    className='object-cover h-[45px] w-[45px] min-w-[45px] border-1 border-blue-400 rounded-full'
                />
              </td>
              <td
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.name || "--"}
              </td>
            <td className="px-4 py-3 text-orange-500">
                <div className="w-[100px]">

                <DaysLeft days={item?.daysLeft}></DaysLeft>
                </div>
                
              </td>
              <td  className="px-4 py-3 ">
                <StatusIndicator days={item?.daysLeft}></StatusIndicator>
                
              </td>
              <td className="px-4 py-3">
                <div className="w-[130px]">

                {item?.joining_date?.formatted || "--"}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="w-[130px]">

                {item?.expiry_date?.formatted || "--"}
                </div>
              </td>
            
            </tr>
          )): 
               <NoDataFound icon={Users} title="No Expiring Users" colSpan={headers.length}></NoDataFound>
           }
      </Table>
    </div>
  );
};
export default ExpiringUsers;
