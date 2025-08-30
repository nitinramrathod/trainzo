"use client"
import { delete_icon, edit_icon } from '@/assets/icons/dashboard'
import Modal from '@/components/common/Modal'
import Button, { CancelButton } from '@/components/forms/Button'
import PageHeader from '@/components/PageHeader'
import { ActionTD } from '@/components/table/Common'
import NoDataFound from '@/components/table/NoDataFound'
import Table, { TableMetaData } from '@/components/table/Table'
import TableLoader from '@/components/table/TableLoader'
import useLoggedInUser from '@/utils/hooks/useLoggedInUser'
import protectedApi from '@/utils/services/protectedAxios'
import { getUsers } from '@/utils/services/dashboard.services'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Users2 } from 'lucide-react'


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
        input: 'text',
        name: 'name',
        width: '200'
    },             
    {
        title: "Contact",
        input: 'text',
        name: 'contact',
    },
    {
        title: "Role",
        input: 'text',
        name: 'role',
    },
    {
        title: "Start Date",
        // input: 'text'
        width: 'w-32'
    },
    {
        title: "End Date",
        // input: 'text'
    },
    {
        title: "Gender",
        input: 'text',
        name: 'gender',
    },
    {
        title: "Remaining Fees",
        // input: 'text'
    },
    {
        title: "Gym Package",
        // input: 'text',
        // name: 'gym_package',
    },
    {
        title: "Action"
    }
    ];
    
   

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modals, setModals] = useState<TModals>({delete_id:null });
    const user = useLoggedInUser();
    const [initialMetaData, setInitialMetaData] = useState<TableMetaData>({ current_page: 1, first_page: 1, last_page: 1, limit: 10, total_items: 1, total_pages: 1 });
    const [filter, setFilter]=useState({});

    const fetchData = () => {   
        setIsLoading(true);    
        getUsers(filter).then(res=>{
            console.log('res==>', res)
            setUsers(res?.data)
            setInitialMetaData(res?.meta);
        }).catch(err=>{
            console.error("Error fetching users:", err);
        }).finally(()=>{
            setIsLoading(false);
        });        
    }

    const deleteUser = async (id) => {
        try {
            const res = await protectedApi.delete(`/api/v1/user/${id}`);
            hideDeleteModal();
            fetchData();
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to delete user:", error);
            throw new Error("Failed to delete user");
        }
    };

    const handleDelete = (id:string)=>{
        setModals({delete_id: id})
    }

    const hideDeleteModal =()=>{
        setModals({delete_id: null})
    }

    const confirmDelete =()=>{
        deleteUser(modals.delete_id)
    }

    useEffect(() => {             
        fetchData();
    }, [filter]);

    const route = useRouter()
    const goToCreate = () => {
        route.push('/dashboard/users/create')
    }

    const tables = "All Users";


    return (<>
        <PageHeader button_text='Create User' onClick={goToCreate} title={tables} />
         <Table setFilter={setFilter} headers={headers} initialMetaData={initialMetaData}>
            {isLoading ? (<TableLoader cols={headers?.length}/>) : (users?.length > 0 ? users?.map((item: User) => (
                        <tr key={item?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            
                            <td className="px-4 py-3">
                                   <Image
                                    src={item?.photo ? `${item?.photo}` : '/images/form/avatar.jpg'}
                                    alt={item?.name || "--"}
                                    width={40}
                                    height={40}
                                    className='object-cover h-[45px] w-[45px] min-w-[45px] border-1 border-blue-400 rounded-full'
                                />                              

                            </td>
                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item?.name || "--"}
                            </th>
                            <td className="px-4 py-3">
                                {item?.contact || "--"}
                            </td>
                            
                            <td className="px-4 py-3">
                            <span className={`  px-3 rounded-2xl py-1 text-xs font-[600] capitalize ${item?.role == 'admin'? 'bg-rose-100 text-rose-600' : item.role == "trainer"?'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} `}>

                                {item?.role || "--"}
                            </span>
                            </td>
                            <td className="px-4 py-3">
                                <div className='w-40'>
                                    {item?.joining_date?.formatted || "--"}
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className='w-50'>
                                    {item?.expiry_date?.formatted || "--"}
                                </div>
                            </td>
                            <td className="px-4 py-3 capitalize">
                                {item?.gender || "--"}
                            </td>
                            <td className="px-4 py-3">
                            {(item?.role == "admin" || item?.role == "trainer" ) ? "N/A":                                    
                                (Number(item?.remaining_fees) <= 0 ? (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-2xl text-xs">
                                    Nill
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                    ₹{item?.remaining_fees}/-
                                    </span>
                                ))}
                            </td>
                            <td className="px-4 py-3">
                                <div className='w-20'>
                                     {(item?.role == "admin" || item?.role == "trainer" ) ? "N/A": (
                                    item?.gym_package?.name || "--")}
                                </div>
                            </td>

                            <ActionTD>
                                <Link href={`/dashboard/users/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{edit_icon}</Link>
                                {user?.id != item?._id &&
                                <button onClick={()=>item._id && handleDelete(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">{delete_icon}</button>
                                }
                            </ActionTD>
                        </tr>
                    )) : <NoDataFound icon={Users2} title='No User found' colSpan={8}/>)}
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