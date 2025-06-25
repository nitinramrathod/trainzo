import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import Stat from "@/components/dashboard/Stat";
import React from "react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      count: 1500,
      description: "Total number of registered users",
    },
    {
      title: "Active Users",
      count: 1200,
      description: "Users active in the last 30 days",
    },
    {
      title: "New Signups",
      count: 300,
      description: "New users signed up this month",
    },
    {
      title: "Total Revenue",
      count: 50000,
      description: "Total revenue generated this month",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
