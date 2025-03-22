import React from 'react'

const NoDataFound = ({colSpan}:any) => {
  return (
    <tr>

    <td className='p-4 bg-gray-800 text-center text-2xl' colSpan={colSpan}>No Data Found!</td>
    </tr>
  )
}

export default NoDataFound