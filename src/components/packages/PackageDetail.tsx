'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import PageHeader from '@/components/PageHeader'
import { API_URL, get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FormTypes {
    pkgName?: string | undefined,
    duration?: string,
    pkgDesc?: string,
    pkgPrice?: any,
    pkgDiscount?: string,
    pkgDiscountedPrice?: string,
    id? : string
}

interface ErrorObject {
    duration?:string,
    pkgPrice?:string,
    pkgName?:string
   

}

const PackageDetail = ({ data }: any) => {
    const [form, setForm] = useState<FormTypes>({})
    const [isEdit, setIsEdit] = useState(false);
    const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const[error, setError] = useState<ErrorObject>({})
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
            formData.append('pkgName', form?.pkgName || '')
            formData.append('duration', form?.duration || '')
            formData.append('pkgDesc', form?.pkgDesc || '')
            formData.append('pkgPrice', form?.pkgPrice || '')
            formData.append('pkgDiscount', form?.pkgDiscount || '')
            if(isEdit){
                formData.append('id', form?.id || '')

            }
            // formData.append('pkgDiscountedPrice', form?.pkgDiscountedPrice || '')



            const url = isEdit ? `${API_URL}/api/v1/gym-package/update` : `${API_URL}/api/v1/gym-package/create`
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
                router.push('/dashboard/packages')
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
        route.push('/dashboard/packages')
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
                <PageHeader onClick={gotoList} button_text="Back to List" title={isEdit?'Update Package' :'create Package'} />
                <div className='bg-gray-200 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Package Name"
                            value={form?.pkgName}
                            placeholder='Enter Package Name'
                            name="pkgName"
                            onChange={handleInputChange}
                            error={error?.pkgName || ''}

                        />
                        <Input
                            label="Duration"
                            value={form?.duration}
                            placeholder='Enter Duration e.g.. 3 months' 
                            name="duration"
                            onChange={handleInputChange}
                            error={error?.duration || ''}
                        />
                        <Input
                            label="Package Desc"
                            value={form?.pkgDesc}
                            placeholder='Enter Package Desc'
                            name="pkgDesc"
                            type='text'
                            onChange={handleInputChange}
                            
                        />
                        <Input
                            label="Price"
                            value={form?.pkgPrice}
                            placeholder='Enter Price'
                            type="number"
                            name="pkgPrice"
                            onChange={handleInputChange}
                            error={error?.pkgPrice || ''}
                        />
                        <Input
                            label="Price Discount"
                            value={form?.pkgDiscount}
                            placeholder='Enter Price Discount'
                            type="number"
                            name="pkgDiscount"
                            onChange={handleInputChange}
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
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageDetail