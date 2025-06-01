"use client"

import PageHeader from '@/components/PageHeader'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Workout{
    workoutName: string;
    workoutDesc: string;
    videoURL: string;
    id: string;
}

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/v1/workout`, {
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


    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/workouts/create')
    }

    const headers = [
        {
            title: "Name"
        },
        {
            title: "Description"
        },
        {
            title: "Video"
        },
       
        {
            title: "Action"
        },
    ];
  
    return (<div >
        <PageHeader button_text='Create Workout' onClick={goToCreate} title='Workout List' />
        <Table headers={headers}>
            {users?.length > 0 ? users?.map((item: Workout) => (

                <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.workoutName}
                    </th>
                    <td className="px-6 py-4">
                        {item?.workoutDesc}
                    </td>
                    <td className="px-6 py-4">
                        {item?.videoURL}
                    </td>

                    <td className="flex items-center px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                    </td>
                </tr>
            )) : <NoDataFound colSpan={headers?.length}/>}
        </Table>
    </div>
    )
}

export default Users