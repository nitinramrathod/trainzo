import Stat from '@/components/dashboard/Stat'
import React from 'react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      count: 1500,
      description: 'Total number of registered users'
    },
    {
      title: 'Active Users',
      count: 1200,
      description: 'Users active in the last 30 days'
    },
    {
      title: 'New Signups',
      count: 300,
      description: 'New users signed up this month'
    },
    {
      title: 'Total Revenue',
      count: 50000,
      description: 'Total revenue generated this month'
    },
    {
      title: 'Total Revenue',
      count: 50000,
      description: 'Total revenue generated this month'
    }
  
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        {stats.map((stat, index) => (
          <Stat key={index+'stats'} stat={stat} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard