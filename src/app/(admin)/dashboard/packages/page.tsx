"use client"

import { delete_icon, edit_icon } from '@/assets/icons/dashboard'
import Modal from '@/components/common/Modal'
import Button, { CancelButton } from '@/components/forms/Button'
import PageHeader from '@/components/PageHeader'
import { ActionTD } from '@/components/table/Common'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import TableLoader from '@/components/table/TableLoader'
import { API_URL } from '@/utils/services/services'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Package {
    _id: string;
    name?: string;
    duration?: string;
    description?: string;
    price?: number;
    discount_price?: number;
    pkgDiscountedPrice?: number;
}

type TModals = {
    delete_id: string| undefined | null
}

const Users = () => {

    const [users, setUsers] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [modals, setModals] = useState<TModals>({delete_id:null })

    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/v1/membership`, {
            method: "GET",
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                // Add any other necessary headers here (e.g., authentication tokens)
            },
        });

        // If the response is not successful, handle the error
        if (!res.ok) {
            setIsLoading(false);
            throw new Error("Failed to fetch products");            
        }

        // Parse the JSON response into product data
        const users = await res.json();
        setUsers(users.data);
        setIsLoading(false);
    }

    
    const handleDelete = (id:string)=>{
        setModals({delete_id: id})
    }

    const hideDeleteModal =()=>{
        setModals({delete_id: null})
    }

    const confirmDelete = async()=>{
        const res = await fetch(`${API_URL}/api/v1/membership/${modals.delete_id}`, {
            method: "DELETE"
        });
      
        if (!res.ok) {
            setIsLoading(false);
            throw new Error("Failed to fetch products");
        }
        hideDeleteModal();
        fetchData();
    }

    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/packages/create')
    }

    const headers = [
        {
            title: "Name",
            input: "text"
        },
        {
            title: "Duration",
            // input: "text"
        },
        {
            title: "Description",
            // input: "text"
        },
        {
            title: " Actual Price",
            // input: "text"
        },
        {
            title: "Action"
        },
    ];

    return (< >
        <PageHeader button_text='Create Package' onClick={goToCreate} title='Package List' />
        <Table headers={headers}>
            {isLoading ? (<TableLoader cols={headers?.length}/>) : users?.length > 0 ? users?.map((item: Package) => (

                <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item?.name || "--"}
                    </th>
                    <td className="px-4 py-3">
                        {`${item?.duration} ${Number(item?.duration) > 1 ? 'Months' : 'Month'}`  || "--"}
                    </td>
                    <td className="px-4 py-3">
                        {item?.description || "--"}
                    </td>
                    <td className="px-4 py-3">
                       <span className='pe-2 font-medium text-lg'>
                        ₹  {item?.discount_price || "--"}
                        </span>
                       {item?.price && <span className='line-through text-red-700'>
                         ₹ {item?.price || "--"}
                        </span>}
                    </td>

                    <ActionTD>
                        <Link href={`/dashboard/packages/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{edit_icon}</Link>
                        <button onClick={()=>handleDelete(item?._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">{delete_icon}</button>
                    </ActionTD>
                </tr>
            )) : <NoDataFound colSpan={headers?.length}/>}
        </Table>

        <Modal open={modals?.delete_id ? true: false} setOpen={hideDeleteModal} backgroundBlur={true} position='top' title="Are you absolutely sure?">
            <div className='flex flex-col items-start justify-start h-full md:w-sm'>               
                    <p className='text-gray-600 text-md'>
                        This action will permanently delete the user from the system.
                    </p>
                    <div className='mt-6 flex justify-end w-full gap-3'>
                    <CancelButton onClick={hideDeleteModal}>Cancel</CancelButton>
                    <Button onClick={confirmDelete} >Confirm</Button>
                </div>
            </div>
        </Modal>
    </>
    )
}

export default Users