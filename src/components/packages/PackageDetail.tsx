'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import PageHeader from '@/components/PageHeader'
import { API_URL} from '@/utils/services/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormWrapper from '../forms/FormWrapper'
import { save_icon } from '@/assets/icons/dashboard'

interface FormTypes {
    name?: string | undefined,
    duration?: string,
    description?: string,
    price?: number | string,
    discount_price?: string,
    _id? : string
}

interface ErrorObject {
    duration?:string,
    price?:string,
    name?:string
    discount_price?:string
    description?:string
}

const PackageDetail = ({ data }: {data?: FormTypes}) => {
    const [form, setForm] = useState<FormTypes>({})
    const [isEdit, setIsEdit] = useState(false);
    // const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const[error, setError] = useState<ErrorObject>({})
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value

        }))
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     setForm((prev) => ({
    //         ...prev,
    //         [e.target.name]: file || null
    //     }));
    // }

    // const getOptions = async ()=>{
    //     const data = await get('/api/v1/gym-package')
    //     setDropdown({packages: data})
    // }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();            

            formData.append('name', form?.name || '')
            formData.append('duration', form?.duration || '')
            formData.append('description', form?.description || '')
            formData.append('price', form?.price ? String(form?.price) : '')
            formData.append('discount_price', form?.discount_price || '')           

            const url = isEdit ? `${API_URL}/api/v1/membership/${form?._id}` : `${API_URL}/api/v1/membership`
            const method = isEdit ? 'PUT' : 'POST';
            const res = await fetch(url,
                {
                    method: method,
                    body: formData                    
                })

            if (res.ok) {
                setForm({})
                router.push('/dashboard/packages')
            } else {
                const errorText = await res.json(); // Try to get error details
                console.log('Error Response:', errorText); 
                // alert('Error while creating package.');
                setError(errorText?.errors); 

            }

        } catch (error) {
            console.log('error', error)
        }
    }

    const route = useRouter()
    const gotoList = () => {
        route.push('/dashboard/packages')
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
    

    return (
        <div>
          
                <PageHeader onClick={gotoList} detail={true} button_text="Back to List" title={isEdit?'Update Package' :'create Package'} />
                <FormWrapper>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
                        <Input
                            label="Package Name"
                            value={form?.name}
                            placeholder='Enter Package Name'
                            name="name"
                            onChange={handleInputChange}
                            error={error?.name || ''}

                        />
                        <Input
                            label="Duration (Month)"
                            value={form?.duration}
                            placeholder='Enter Duration e.g. 3' 
                            name="duration"
                            onChange={handleInputChange}
                            error={error?.duration || ''}
                        />
                        <Input
                            label="Package Desc"
                            value={form?.description}
                            placeholder='Enter Package Desc'
                            name="description"
                            type='text'
                            onChange={handleInputChange}
                            
                        />
                        <Input
                            label="Price"
                            value={form?.price}
                            placeholder='Enter Price'
                            type="number"
                            name="price"
                            onChange={handleInputChange}
                            error={error?.price || ''}
                        />
                        <Input
                            label="Price Discount"
                            value={form?.discount_price}
                            placeholder='Enter Price Discount'
                            type="number"
                            name="discount_price"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}>{save_icon} {form?._id ? "Update": "Submit"}</Button>
                    </div>
                </FormWrapper>
          
        </div>
    )
}

export default PackageDetail