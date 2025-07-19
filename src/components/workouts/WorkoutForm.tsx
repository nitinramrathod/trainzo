'use client'
import { save_icon } from '@/assets/icons/dashboard'
import Button from '@/components/forms/Button'
import FormWrapper from '@/components/forms/FormWrapper'
import Input from '@/components/forms/Input'
import PageHeader from '@/components/PageHeader'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Textarea from '../forms/Textarea'

interface FormTypes {
    name?: string | undefined,
    description?: string,
    video_iframe?: string,
    _id?: string | number
}

interface CreateUserProps {
    data?: FormTypes;
}

const WorkoutForm = ({ data }: CreateUserProps) => {
    const [form, setForm] = useState<FormTypes>({})
    const [isEdit, setIsEdit] = useState(false);
    // const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', form?.name || '')
            formData.append('description', form?.description || '')
            formData.append('video_iframe', form?.video_iframe || '')

            const url = isEdit ? `${API_URL}/api/v1/workout/${data?._id}` : `${API_URL}/api/v1/workout`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url,
                {
                    method: method,
                    body: formData,
                })

            if (res.ok) {
                setForm({})
                router.push('/dashboard/workouts')
            } else {
                alert('Error while creating workout.')
            }

        } catch (error) {
            console.log('error', error)
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

    return (
        <div>
            <div>
                <PageHeader onClick={gotoList} detail={true} button_text="Back to List" title='Create Workout' />
                <FormWrapper>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
                        <Input
                            label="Workout Name"
                            value={form?.name}
                            placeholder='Enter Workout Name'
                            name="name"
                            onChange={handleInputChange}

                        />
                        <Input
                            label="Description"
                            value={form?.description}
                            placeholder='Enter Description'
                            name="description"
                            onChange={handleInputChange}
                        />
                        <Textarea
                            label="Video Iframe"
                            value={form?.video_iframe}
                            placeholder='Enter Video Iframe'
                            name="video_iframe"
                            onChange={handleInputChange}
                        />
                        
                    </div>
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}>{save_icon}Submit</Button>
                    </div>
                </FormWrapper>
            </div>
        </div>
    )
}

export default WorkoutForm