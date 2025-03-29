'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Link from 'next/link'
import React, { useState } from 'react'

interface FormTypes {
    password?: string | undefined,
    email_id?: string,
}

interface ErrorObject {
    email_id?: string,
    password?: string,

}

const Page = () => {
    const [form, setForm] = useState<FormTypes>({})
    const [error, setError] = useState<ErrorObject>({});

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value

        }))
    };


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('email_id', form?.email_id || '')
            formData.append('password', form?.password || '')

            const res = await fetch('https://admin-timely.tantra-gyan.com/api/v1/login',
                // const res = await fetch('http://127.0.0.1:3700/api/v1/login',
                {
                    method: 'POST',
                    body: formData,
                    credentials: "include",
                })

            if (res.ok) {
                setForm({})
            } else {
                const errorText = await res.text(); // Try to get error details
                console.log('Error Response:', errorText); // Log the actual error
                setError(JSON.parse(errorText));
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='grid items-center justify-center h-screen'>
            <div className='rounded-2xl bg-gray-800 p-7 py-8 w-[400px]'>
                <h2 className='text-[2.5rem] mb-10'>Login</h2>
                <div className='flex flex-col gap-3 mb-4'>

                    <Input
                        label="Email"
                        value={form?.email_id}
                        placeholder='Enter Email'
                        name="email_id"
                        onChange={handleInputChange}
                        error={error?.email_id || ''}

                    />
                    <Input
                        label="Password"
                        value={form?.password}
                        placeholder='Enter password'
                        name="password"
                        type='password'
                        onChange={handleInputChange}
                        error={error?.password || ''}

                    />
                    <Button onClick={handleSubmit} >Login</Button>
                </div>
                <Link href='/forgot-password'>Forgot Password?</Link>
            </div>
        </div>
    )
}

export default Page