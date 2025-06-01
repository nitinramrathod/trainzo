'use client'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import { ModalBox } from '@/components/Modal'
import PageHeader from '@/components/PageHeader'
import AddWorkouts from '@/components/pages/AddWorkouts'
import { TR, TD } from '@/components/table/Common'
import Table from '@/components/table/Table'
import { API_URL, get } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface FormTypes {
    workoutPlanName?: string | undefined,
    id?: string,
    days?: number,
    exercises?: Array<any> | undefined,

}
interface ErrorObject {
    workoutPlanName?: string
}

const CreateUser = ({ data }: any) => {
    const [form, setForm] = useState<FormTypes>({ exercises: [] })
    const [isEdit, setIsEdit] = useState(false);
    const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const [error, setError] = useState<ErrorObject>({});
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const [days, setDays] = useState<any>([])
    const [day, setDay] = useState<any>()

    const [exercises, setExercises] = useState<any>([{onDay: 1, setCount: 0, repsCount: '', gapBwSet: ''}])


    const handleInputChange = (e: any) => {

        const { name, value } = e.target;

        if (name == 'days' && value > 90) {
            alert('Days cannot be more than 90')
            return;
        }
        setForm(prev => ({
            ...prev,
            [name]: value

        }))
    };


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
                    headers: {
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

    const handleAddWorkout = (day: any) => {
        setDay(day)
        setOpen(true);
        setForm(prev => ({
            ...prev,
            exercises: [
                ...(prev?.exercises || []),
            ]
        }))
    }

    useEffect(() => {

        const generateDays = () => {
            const arr: { day: number }[] = []

            for (let i = 1; i <= (form.days ?? 0); i++) {
                arr.push({ day: i })
            }
            setDays(arr)
        }


        generateDays()
    }, [form.days])





    return (
        <div>
            <div>
                <PageHeader onClick={gotoList} button_text="Back to List" title='Create Plan' />
                <div className='bg-gray-200 py-8 px-5 rounded-md'>

                    <div className="grid grid-cols-3  gap-x-5 gap-y-4">
                        <Input
                            label="Plan Name"
                            value={form?.workoutPlanName}
                            placeholder='Enter Plan Name'
                            name="workoutPlanName"
                            onChange={handleInputChange}
                            error={error?.workoutPlanName || ''}
                        />

                        <Input
                            label="Enter Days"
                            value={form?.days}
                            placeholder='Enter days'
                            name="days"
                            type='number'
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Table headers={headers}>
                            {
                                days?.length > 0 && days.map(item => {
                                    return <TR key={item.day}><TD>{item.day}</TD> <TD>{item.workouts}</TD> <TD> <button onClick={() => handleAddWorkout(item.day)}>Add</button></TD></TR>
                                })
                            }
                        </Table>
                    </div>
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>

            <ModalBox open={open} setOpen={setOpen}>
                <AddWorkouts exercises={exercises} day={day} setExercises={setExercises}></AddWorkouts>
            </ModalBox>
        </div>
    )
}

export default CreateUser