"use client";

import { rupee_icon, users_icon } from "@/assets/icons/dashboard";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import Stat from "@/components/dashboard/Stat";
import protectedApi from "@/utils/services/protectedAxios";
import React, { useEffect } from "react";

const dummyStat = [
  {
      title: "Total Users",
      count: 1500,
      icon:users_icon,
      description: "Total number of registered users",
    },
    {
      title: "Active Users",
      count: 1200,
      icon:users_icon,
      description: "Users active in the last 30 days",
    },
    {
      title: "New Signups",
      count: 300,
      icon:users_icon,
      description: "New users signed up this month",
    },
    {
      title: "Total Revenue",
      count: 50000,
      icon:rupee_icon,
      description: "Total revenue generated this month",
    },
  ];
  const Dashboard = () => {
    const [stats, setStats] = React.useState(dummyStat);

  // /api/v1/analytics/stats

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
              },
              {
                title: "Active Users",
                count: data?.activeUsers || 0,
                icon:users_icon,
                description: "Users active in the last 30 days",
              },
              {
                title: "New Signups this month",
                count: data?.newUsers || 0,
                icon:users_icon,
                description: "New users signed up this month",
              },
              {
                title: "Total Revenue this month",
                count: data?.totalRevenue || 0,
                icon:rupee_icon,
                description: "Total revenue generated this month",
              },
              {
                title: "Remaining Fees this month",
                count: data?.remainingFees || 0,
                icon:rupee_icon,
                description: "Total remaining fees to be collected",
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
        {stats.map((stat, index) => (
          <Stat key={index + "stats"} stat={stat} />
        ))}
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
