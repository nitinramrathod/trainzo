"use client"
import PageHeader from '@/components/PageHeader'
import { ActionTD } from '@/components/table/Common'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import TableLoader from '@/components/table/TableLoader'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface User {
    id: string;
    photo?: string;
    name?: string;
    email?: string;
    mob?: string;
    username?: string;
    role?: string;
}

const Users = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/v1/user`, {
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
            setIsLoading(false);
        }

        // Parse the JSON response into product data
        const users = await res.json();
        setUsers(users);
        setIsLoading(false);
    }

    // const goToCreate = () => {
    //     router.push('/admin/products/create')
    // }
    // const goToEdit = (id) => {
    //     router.push(`/admin/products/${id}`)
    // }

    // const handleDelete = async (id) => {
    //     const res = await fetch(`${API_URL}/products/${id}`, {
    //         method: "Delete"
    //     });

    //     if (!res.ok) {
    //         throw new Error("Failed to delete product");
    //     } else {
    //         fetchData()

    //     }
    // }

    
    const headers = [
        {
            title: "Name",
            input: "text"
        },
        {
            title: "Subject",
            input: "text"
        },       
        {
            title: "Message",
            input: "text"
        },
        {
            title: "Address",
            input: "text"
        },
        {
            title: "Action"
        }
    ];

    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/users/create')
    }


    return (<div >
        <PageHeader button_text={false} onClick={goToCreate} title='Diets' />
         <Table headers={headers}>
            {isLoading ? (<TableLoader cols={headers?.length}/>) : users?.length > 0 ? users?.map((item: User) => (
                        <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.name || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.email || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.mob || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.username || "--"}
                            </td>                        

                            <ActionTD>
                                <a href={`/dashboard/users/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                            </ActionTD>
                        </tr>
                    )) : <NoDataFound colSpan={8}/>}
        </Table>
        
        
        
       

    </div>




    )
}

export default Users