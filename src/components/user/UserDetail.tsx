'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import PageHeader from '@/components/PageHeader'
import { API_URL, get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FormTypes {
    name?: string | undefined,
    email?: string,
    username?: string,
    photo?: any,
    mob?: string,
    pkgStartDate?: string,
    pkgId?: string,
    id?: string
}

interface ErrorObject {
    email?:string,
    mob?:string,
    name?:string,
    username?:string

}
function UserDetail({data}:any) {

    console.log("data", data)
    const [form, setForm] = useState<FormTypes>({})
    const [isEdit, setIsEdit] = useState(false);
    const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const [error, setError] = useState<ErrorObject>({});
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
            if(isEdit){
                formData.append('id', form?.id || '')

            }

            if (form.photo) {
                formData.append('photo', form.photo);
            }

            const url = isEdit ? `${API_URL}/api/v1/user/update` : `${API_URL}/api/v1/user/create`
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
                const errorText = await res.text(); // Try to get error details
                console.log('Error Response:', errorText); // Log the actual error
                setError(JSON.parse(errorText)); 
            }

        } catch (error) {
            console.log(error)


        }
    }

    const route = useRouter()
    const gotoList = () => {
        route.push('/dashboard/users')
    }

    useEffect(() => {
        if (data) {
            console.log("data", data)
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
                <div className='bg-gray-200 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Enter Name"
                            value={form?.name}
                            placeholder='Enter Name'
                            name="name"
                            onChange={handleInputChange}
                            error={error?.name || ''}

                        />
                        <Input
                            label="Enter Username"
                            value={form?.username}
                            placeholder='Enter Username'
                            name="username"
                            onChange={handleInputChange}
                            error={error?.username || ''}

                        />
                        <Input
                            label="Enter Email"
                            value={form?.email}
                            placeholder='Enter Email'
                            name="email"
                            type='email'
                            onChange={handleInputChange}
                            error={error?.email || ''}
                        />
                        <Input
                            label="Enter Mobile"
                            value={form?.mob}
                            placeholder='Enter Mobile Number'
                            type="tel"
                            name="mob"
                            onChange={handleInputChange}
                            error={error?.mob || ''}
                        />
                      <div>
                        <Input
                            label="Select Image"
                            value=""
                            placeholder='Select Image'
                            name="photo"
                            type='file'
                            onChange={handleImageChange}

                        />
                       
                       {form?.photo && <img src={`${API_URL}/${form?.photo}`} alt="" className='w-[50px] object-cover border-2 border-blue-400 h-[50px] rounded-full' />
                       }</div>
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
                            name="gymPkgId"
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

export default UserDetail