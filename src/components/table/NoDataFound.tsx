
import { TextSearch } from 'lucide-react'
import React from 'react'

const NoDataFound = ({colSpan, icon:Icon=TextSearch, title}:{colSpan: number, icon?: React.ElementType, title?:string}) => {
  return (
    <tr>
    <td className=' bg-gray-100 text-center text-2xl' colSpan={colSpan}>
       <div className="flex items-center justify-center flex-col p-14 text-2xl">

            {Icon && <Icon size={60} className='text-indigo-400'></Icon>}
            <span className="text-indigo-300 font-[500]">
            {title? title : 'No Data Found'}
            </span>
                </div>
      </td>
    </tr>
  )
}

export default NoDataFound