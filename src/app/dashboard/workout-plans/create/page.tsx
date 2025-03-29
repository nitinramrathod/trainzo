'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import Modal from '@/components/Modal'
import PageHeader from '@/components/PageHeader'
import {TR, TD} from '@/components/table/Common'
import Table from '@/components/table/Table'
import { API_URL, get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FormTypes {
    workoutPlanName?: string | undefined,
    exercises?: Object | undefined,
    id?:string
   
}
interface ErrorObject {
    workoutPlanName? : string
}

const CreateUser = ({ data }: any) => {
    const [form, setForm] = useState<FormTypes>({exercises:[]})
    const [isEdit, setIsEdit] = useState(false);
    const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const [error, setError] = useState<ErrorObject>({});
    const router = useRouter();
    const [days, setDays] = useState<any>([{day: 1, workouts: 3}, {day: 2, workouts: 3}])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value

        }))
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setForm((prev) => ({
            ...prev,
            [e.target.name]: file || null
        }));
    }

    // const getOptions = async ()=>{
    //     const data = await get('/api/v1/gym-package')
    //     setDropdown({packages: data})
    // }

    const handleSubmit = async () => {
        try {
            // const formData = new FormData();
            // formData.append('workoutPlanName', form?.workoutPlanName || '')
            // formData.append('exercises', '[]')
            // // formData.append('pkgDiscountedPrice', form?.pkgDiscountedPrice || '')
            // if(isEdit){
            //     formData.append('id', form?.id || '')

            // }




            const url = isEdit ? `${API_URL}/api/v1/workout-plan/update` : `${API_URL}/api/v1/workout-plan/create`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url,
                {
                   
                    method: method,
                    body: JSON.stringify(form),
                    headers:{
                        "Content-Type": "application/json"
                    }
                })

            if (res.ok) {
                setForm({})
                router.push('/dashboard/workout-plans')
            } else {
                const errorText = await res.text(); // Try to get error details
                console.log('Error Response:', errorText); 
                // alert('Error while creating package.');
                setError(JSON.parse(errorText));
            }

        } catch (error) {

        }
    }

    const route = useRouter()
    const gotoList = () => {
        route.push('/dashboard/workout-plans')
    }

    useEffect(() => {
        if (data) {
            setIsEdit(true)
            setForm(data)
        }
    }, [data])

    // useEffect(() => {
    //     getOptions()
    // }, [])

    const headers = [
        {
            title: "Day"
        },
    
        {
            title: "Workouts"
        },
        {
            title: "Action"
        },
    ];


    

    return (
        <div>
            <div className='p-4'>
                <PageHeader onClick={gotoList} button_text="Back to List" title='Create Plan' />
                <div className='bg-gray-800 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Plan Name"
                            value={form?.workoutPlanName}
                            placeholder='Enter Plan Name'
                            name="workoutPlanName"
                            onChange={handleInputChange}
                            error={error?.workoutPlanName || ''}

                        />
                       
                        {/* <Input
                            label="Select Image"
                            value=""
                            placeholder='Select Image'
                            name="photo"
                            type='file'
                            onChange={handleImageChange}
                        /> */}
                        {/* <Input
                            label="Enter Start Date"
                            value={form?.pkgStartDate}
                            type="date"
                            placeholder='Enter Start Date'
                            name="pkgStartDate"
                            onChange={handleInputChange}
                        />
                        <Select
                            onChange={handleInputChange}
                            name="pkgId"
                            options={dropdown?.packages?.map((item:any)=>({
                                value: item?.id,
                                label: item?.pkgName}
                            ))}
                        /> */}
                    </div>
                   
                    <div>
                    <Table headers={headers}>
                            {
                                days?.length > 0 && days.map(item=>{
                                    return <TR key={item.day}><TD>{item.day}</TD> <TD>{item.workouts}</TD> <TD>...</TD></TR>
                                })
                            }
                    </Table>
                    </div>
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUser