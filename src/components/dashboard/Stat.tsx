import React from 'react'

interface ItemProps {    
    title: string;
    count: number;
    description: string;  
    icon?: React.ReactNode; 
}

const Stat = ({ stat }: { stat: ItemProps }) => {
  return (

    <div className="flex items-center p-3 shadow-sm rounded-md bg-white border-1 border-indigo-200">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 text-2xl">
                    {stat?.icon}
                </div>

                <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">{stat?.count || 1234}</h4>
                    <div className="text-gray-500 text-sm">{stat?.title || 'Stat Title'}</div>
                </div>
            </div>

    
  )
}

export default Stat