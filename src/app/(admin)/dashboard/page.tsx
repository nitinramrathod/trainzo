"use client";

import { rupee_icon, users_icon } from "@/assets/icons/dashboard";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import Stat from "@/components/dashboard/Stat";
import protectedApi from "@/utils/services/protectedAxios";
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

    const fetchData = async () => {
      protectedApi.get('/api/v1/analytics/stats').then((res)=>{
        console.log('res', res.data);
        if(res?.data){
          const data = res?.data;
          const updatedStats = [
            {
                title: "Total Users",
                count: data?.totalUsers || 0,
                icon:users_icon,
                description: "Total number of registered users",
                period: "Overall",
              },
              {
                title: "Active Users",
                count: data?.activeUsers || 0,
                icon:users_icon,
                description: "Current active users",
                period: "Overall",
              },
              {
                title: "New Users",
                count: data?.newUsers || 0,
                icon:users_icon,
                description: "New users signed up this month",
                period: "This month",
              },
              {
                title: "Revenue",
                count: `${data?.totalRevenue || 0}/-`,
                icon:rupee_icon,
                description: "Total revenue generated this month",
                period: "This month",
              },
              {
                title: "Pending Fees",
                count: `${data?.remainingFees || 0}/-`,
                icon:rupee_icon,
                description: "Total remaining fees to be collected",
                period: "This month",
                type: "warning"

              },
            ];
            setStats(updatedStats);
        }
      }).catch((err)=>{
        console.log('err', err);
      })
    };

    useEffect(() => {
      fetchData();
    }, []);


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.length > 0 ? stats?.map((stat, index) => (
          <Stat key={index + "stats"} stat={stat} />
        )) : Array.from({length: 5}).map((_, index) => <div key={index+'loader'} className="text-gray-500 shadow border-1  border-white p-10  bg-indigo-200 animate-pulse rounded-md"></div>)} 
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-7 w-full">
        <div className="bg-white rounded-lg lg:flex-1 shadow-lg p-4">
          <PieChart />
        </div>
        <div className="bg-white rounded-lg lg:flex-2 shadow-lg lg:w-[100px] p-4">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
