"use client";

import { rupee_icon, users_icon } from "@/assets/icons/dashboard";
// import BarChart from "@/components/dashboard/BarChart";
import ExpiringUsers from "@/components/dashboard/ExpiringUsers";
import PieChart from "@/components/dashboard/PieChart";
import Stat from "@/components/dashboard/Stat";
import protectedApi from "@/utils/services/protectedAxios";
import { Info } from "lucide-react";
import React, { useEffect } from "react";

export interface ItemProps {
  title?: string;
  count?: number | string;
  description?: string;
  period?: string;
  type?: string;
  icon?: React.ReactNode;
}

const Dashboard = () => {
  const [stats, setStats] = React.useState<ItemProps[] | []>([]);
  const [expiringUsers, setExpiringUsers] = React.useState([]);

  const fetchData = async () => {
    try {
      const [statResponse, expiringUserResponse] = await Promise.all([
        protectedApi
          .get("/api/v1/analytics/stats")
          .catch((e) => console.log("Error in stats fetching", e)),
        protectedApi({url: "/api/v1/user/expiring", method:"GET", params: {limit:100, page: 1 }})
          .catch((e) => console.log("Error in expiring users fetching", e)),
      ]);

      if (statResponse?.data) {
        const data = statResponse.data;
        const updatedStats = [
          {
            title: "Total Users",
            count: data?.totalUsers || 0,
            icon: users_icon,
            description: "Total number of registered users",
            period: "Overall",
          },
          {
            title: "Active Users",
            count: data?.activeUsers || 0,
            icon: users_icon,
            description: "Current active users",
            period: "Overall",
          },
          {
            title: "New Users",
            count: data?.newUsers || 0,
            icon: users_icon,
            description: "New users signed up this month",
            period: "This month",
          },
          {
            title: "Revenue",
            count: `${data?.totalRevenue || 0}/-`,
            icon: rupee_icon,
            description: "Total revenue generated this month",
            period: "This month",
          },
          {
            title: "Pending Fees",
            count: `${data?.remainingFees || 0}/-`,
            icon: rupee_icon,
            description: "Total remaining fees to be collected",
            period: "This month",
            type: "warning",
          },
        ];

        setStats(updatedStats);
      }

      if (expiringUserResponse?.data) {
        setExpiringUsers(expiringUserResponse.data);
      }
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.length > 0
          ? stats?.map((stat, index) => (
              <Stat key={index + "stats"} stat={stat} />
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <StatCardSkeleton key={`${index}-stat-loader`} />
            ))}
      </div>
      <div className="flex flex-col min-h-[400px] lg:flex-row gap-6 mt-7 w-full">
        <div className="bg-white rounded-lg lg:flex-1 shadow-lg p-4">
          <h2 className="mb-4 text-xl flex gap-2 items-center font-[600] text-gray-600">Users Chart <span className="text-xs text-indigo-400" title="Users detail will show here."><Info size={16}/></span></h2>

          <PieChart />
        </div>
        <div className="bg-white rounded-lg lg:flex-2 shadow-lg lg:w-[100px] p-4">
          <h2 className="mb-4 text-xl flex gap-2 items-center font-[600] text-gray-600">Expiring Users <span className="text-xs text-indigo-400" title="Users whose membership is set to expire in less than 11 days."><Info size={16}/></span></h2>
          <ExpiringUsers data={expiringUsers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const StatCardSkeleton = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-3 animate-pulse">
      {/* Circle icon skeleton */}
      <div className="w-12 aspect-square max-w-12 h-12 min-w-12 flex-1 rounded-full bg-gray-200"></div>

      {/* Text skeleton */}
      <div className="flex flex-3 flex-col gap-2">
        {/* Number skeleton */}
        <div className="h-5 w-8 bg-gray-200 rounded"></div>

        {/* Label skeleton */}
        <div className="h-4 p-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
