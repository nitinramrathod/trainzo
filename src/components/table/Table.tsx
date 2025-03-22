import React from 'react'
import TableHead from './TableHead'

const Table = ({ children, headers }: any) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHead headers={headers} />
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default Table