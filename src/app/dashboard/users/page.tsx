"use client"

import Input from '@/components/forms/Input'
import PageHeader from '@/components/PageHeader'
import NoDataFound from '@/components/table/NoDataFound'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const backendURL = "http://192.168.3.92:8080"

const Users = () => {

    const [users, setUsers] = useState([])


    const fetchData = async () => {
        const res = await fetch(`${backendURL}/api/v1/user`, {
            method: "GET",
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                // Add any other necessary headers here (e.g., authentication tokens)
            },
        });

        // If the response is not successful, handle the error
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        // Parse the JSON response into product data
        const users = await res.json();
        setUsers(users)
    }

    // const goToCreate = () => {
    //     router.push('/admin/products/create')
    // }
    // const goToEdit = (id) => {
    //     router.push(`/admin/products/${id}`)
    // }

    // const handleDelete = async (id) => {
    //     const res = await fetch(`${backendURL}/products/${id}`, {
    //         method: "Delete"
    //     });

    //     if (!res.ok) {
    //         throw new Error("Failed to delete product");
    //     } else {
    //         fetchData()

    //     }
    // }

    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/users/create')
    }


    return (<div className='p-4'>
        <PageHeader button_text='Create User' onClick={goToCreate} title='User List' />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Image
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Name
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Email
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Mobile
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Username
                        </th>
                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Role
                        </th>

                        <th scope="col" className="px-6  text-[.8rem] py-3 font-bold text-white">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {users?.length > 0 ? users?.map((item: any) => (
                        <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {/* {item?.photo || 'image'} */}
                                <img src={`${backendURL}/${item.photo}`} alt="" className='w-[50px] object-cover border-2 border-blue-400 h-[50px] rounded-full' />

                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.name || "--"}
                            </th>
                            <td className="px-6 py-4">
                                {item?.email || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.mob || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.username || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.role || "--"}
                            </td>

                            <td className="flex items-center px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                            </td>
                        </tr>
                    )) : <NoDataFound colSpan={8}>No data found</NoDataFound>}
                </tbody>
            </table>
        </div>

    </div>




    )
}

export default Users