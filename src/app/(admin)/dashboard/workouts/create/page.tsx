'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import PageHeader from '@/components/PageHeader'
import { API_URL, get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FormTypes {
    workoutName?: string | undefined,
    workoutDesc?: string,
    videoURL?: string,
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
        const data = await get('/api/v1/workout/create')
        setDropdown({packages: data})
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('workoutName', form?.workoutName || '')
            formData.append('workoutDesc', form?.workoutDesc || '')
            formData.append('videoURL', form?.videoURL || '')

            const url = isEdit ? `${API_URL}/api/v1/workout/${data?.id}` : `${API_URL}/api/v1/workout/create`
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
                router.push('/dashboard/workouts')
            } else {
                alert('Error while creating workout.')
            }

        } catch (error) {

        }
    }

    const route = useRouter()
    const gotoList = () => {
        route.push('/dashboard/workouts')
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
            <div>
                <PageHeader onClick={gotoList} button_text="Back to List" title='Create Workout' />
                <div className='bg-gray-200 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Workout Name"
                            value={form?.workoutName}
                            placeholder='Enter Workout Name'
                            name="workoutName"
                            onChange={handleInputChange}

                        />
                        <Input
                            label="Description"
                            value={form?.workoutDesc}
                            placeholder='Enter Description'
                            name="workoutDesc"
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Video URL"
                            value={form?.videoURL}
                            placeholder='Enter Video URL'
                            name="videoURL"
                            type='text'
                            onChange={handleInputChange}
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