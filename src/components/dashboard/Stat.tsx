import { ItemProps } from '@/app/(admin)/dashboard/page'
import React from 'react'


const Stat = ({ stat }: { stat: ItemProps }) => {
  return (
    <div className={`flex items-center p-3 shadow-sm rounded-md bg-white border-1 border-indigo-200 ${stat.type == 'warning' ? 'border-red-300 ':''}`}>
        <div className={`p-3 rounded-full bg-indigo-100 text-indigo-600 text-2xl ${stat.type == 'warning' ? 'bg-red-100 text-red-600 ':''}`}>
            {stat?.icon}
        </div>

        <div className="ms-4">
            <h4 className={`text-2xl font-semibold text-gray-700 ${stat.type == 'warning' ? 'text-red-600 ':''}`}>{stat?.count || 1234}</h4>
            <div className="text-gray-500 text-sm">{stat?.title || 'Stat Title'} <span className="text-indigo-400 text-[10px] font-bold">({stat?.period || 'Overall'})</span></div>
        </div>
    </div>    
  )
}

export default Stat