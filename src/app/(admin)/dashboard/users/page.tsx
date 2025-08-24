"use client"
import { delete_icon, edit_icon } from '@/assets/icons/dashboard'
import Modal from '@/components/common/Modal'
import Button, { CancelButton } from '@/components/forms/Button'
import PageHeader from '@/components/PageHeader'
import { ActionTD } from '@/components/table/Common'
import NoDataFound from '@/components/table/NoDataFound'
import Table from '@/components/table/Table'
import TableLoader from '@/components/table/TableLoader'
import protectedApi from '@/utils/services/protectedAxios'
import { API_URL, get } from '@/utils/services/services'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface User {
    _id?: string;
    photo?: string;
    name?: string;
    email?: string;
    mob?: string;
    expiry_date?: {formatted: string};
    joining_date?: {formatted: string};
    contact?: string;
    gym_package?: {name:string};
    role?: string;
    gender: string;
    remaining_fees: string;
}

type TModals = {
    delete_id: string| undefined | null
}


    const headers = [
    {
        title: "Image"
    },
    {
        title: "Name",
        input: 'text'
    },             
    {
        title: "Mobile",
        // input: 'text'
    },
    {
        title: "Role",
        // input: 'text'
    },

    {
        title: "Start Date",
        // input: 'text'
    },
    {
        title: "End Date",
        // input: 'text'
    },
        {
        title: "Gender",
        // input: 'text'
    },
    {
        title: "Remaining Fees",
        // input: 'text'
    },
    {
        title: "Gym Plan",
        // input: 'text'
    },
    {
        title: "Action"
    }
    ];

const Users = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modals, setModals] = useState<TModals>({delete_id:null })

    const fetchData = async () => {

        get("/api/v1/user").then((res) => {
            setUsers(res?.data)
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.error("Error fetching users:", error);  
        });
    }

    const deleteUser = async (id) => {
        try {
            const res = await protectedApi.delete(`/api/v1/user/${id}`);

            // Axios throws an error automatically for non-2xx responses, so no need to check res.ok

            hideDeleteModal();
            fetchData();
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to delete user:", error);
            throw new Error("Failed to delete user");
        }
        };

    const handleDelete = (id:string)=>{
        console.log('modals', modals)
        setModals({delete_id: id})
    }

    const hideDeleteModal =()=>{
        setModals({delete_id: null})
    }

    const confirmDelete =()=>{
        deleteUser(modals.delete_id)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/users/create')
    }

    const tables = [
        {title: "Active Users", value: "Nitin Rathod"},
        {title: "Expiring Users", value: "9876543210"},
    ]

    return (<>
        <PageHeader button_text='Create User' onClick={goToCreate} title={tables} />
         <Table headers={headers}>
            {isLoading ? (<TableLoader cols={headers?.length}/>) : (users?.length > 0 ? users?.map((item: User) => (
                        <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            
                            <td className="px-6 py-4">
                                   <Image
                                    src={item.photo ? `${API_URL}/${item.photo}` : '/images/form/avatar.jpg'}
                                    alt={item?.name || "--"}
                                    width={50}
                                    height={50}
                                    className='object-contain h-[45px] w-[45px] min-w-[45px] border-1 border-blue-400 rounded-full'
                                />                              

                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.name || "--"}
                            </th>
                            <td className="px-6 py-4">
                                {item?.contact || "--"}
                            </td>
                            
                            <td className="px-6 py-4">
                            <span className='bg-indigo-400 text-slate-50 px-3 rounded-xl py-1 text-xs capitalize'>

                                {item?.role || "--"}
                            </span>
                            </td>
                            <td className="px-6 py-4">
                                {item?.joining_date?.formatted || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.expiry_date?.formatted || "--"}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {item?.gender || "--"}
                            </td>
                            <td className="px-6 py-4 text-red-600">
                                {`${item?.remaining_fees}/-` || "--"}
                            </td>
                            <td className="px-6 py-4">
                                {item?.gym_package?.name || "--"}
                            </td>

                            <ActionTD>
                                <Link href={`/dashboard/users/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{edit_icon}</Link>
                                <button onClick={()=>item._id && handleDelete(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">{delete_icon}</button>
                            </ActionTD>
                        </tr>
                    )) : <NoDataFound colSpan={8}/>)}
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