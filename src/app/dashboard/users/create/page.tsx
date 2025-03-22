'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import PageHeader from '@/components/PageHeader'
import { get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const backendURL = "http://192.168.3.92:8080"

interface FormTypes {
    name?: string | undefined,
    email?: string,
    username?: string,
    photo?: any,
    mob?: string,
    pkgStartDate?: string,
    pkgId?: string,
}

const CreateUser = ({ data }: any) => {
    const [form, setForm] = useState<FormTypes>({})
    const [isEdit, setIsEdit] = useState(false);
    const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const router = useRouter();

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

    const getOptions = async ()=>{
        const data = await get('/api/v1/gym-package')
        setDropdown({packages: data})
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', form?.name || '')
            formData.append('email', form?.email || '')
            formData.append('username', form?.username || '')
            formData.append('mob', form?.mob || '')
            formData.append('pkgId', form?.pkgId || '')
            formData.append('pkgStartDate', form?.pkgStartDate || '')

            if (form.photo) {
                formData.append('photo', form.photo);
            }

            const url = isEdit ? `${backendURL}/api/v1/user/${data?.id}` : `${backendURL}/api/v1/user/create`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url,
                {
                    method: method,
                    body: formData,
                })

            if (res.ok) {
                setForm({})
                router.push('/dashboard/users')
            } else {
                alert('Error while creating product.')
            }

        } catch (error) {

        }
    }

    const route = useRouter()
    const gotoList = () => {
        route.push('/dashboard/users')
    }

    useEffect(() => {
        if (data) {
            setIsEdit(true)
            setForm(data)
        }
    }, [data])

    useEffect(() => {
        getOptions()
    }, [])
    

    return (
        <div>
            <div className='p-4'>
                <PageHeader onClick={gotoList} button_text="Back to List" title='Create User' />
                <div className='bg-gray-800 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Enter Name"
                            value={form?.name}
                            placeholder='Enter Name'
                            name="name"
                            onChange={handleInputChange}

                        />
                        <Input
                            label="Enter Username"
                            value={form?.username}
                            placeholder='Enter Username'
                            name="username"
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Enter Email"
                            value={form?.email}
                            placeholder='Enter Email'
                            name="email"
                            type='email'
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Enter Mobile"
                            value={form?.mob}
                            placeholder='Enter Mobile Number'
                            type="tel"
                            name="mob"
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Select Image"
                            value=""
                            placeholder='Select Image'
                            name="photo"
                            type='file'
                            onChange={handleImageChange}
                        />
                        <Input
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
                        />
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