'use client'
import { save_icon } from '@/assets/icons/dashboard'
import Button from '@/components/forms/Button'
import FormWrapper from '@/components/forms/FormWrapper'
import Input from '@/components/forms/Input'
import { ModalBox } from '@/components/Modal'
import PageHeader from '@/components/PageHeader'
import AddWorkouts, { Exercise } from '@/components/pages/AddWorkouts'
import { TR, TD } from '@/components/table/Common'
import Table from '@/components/table/Table'
import { API_URL } from '@/utils/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Define Exercise type here if the import fails

interface FormTypes {
    workoutPlanName?: string | undefined,
    id?: string,
    days?: number,
    exercises?: Exercise[] | undefined,

}
interface ErrorObject {
    workoutPlanName?: string
}

const WorkoutPlanForm = ({ data }: { data?: FormTypes }) => {
    const [form, setForm] = useState<FormTypes>({ exercises: [] })
    const [isEdit, setIsEdit] = useState(false);
    // const [dropdown, setDropdown] = useState<{ packages?: any[] }>({});
    const [error, setError] = useState<ErrorObject>({});
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const [days, setDays] = useState<{ day: number, workouts: string }[]>([])
    const [day, setDay] = useState<number | undefined>()

    const [exercises, setExercises] = useState<Exercise[]>([{onDay: 1, setCount: 0, repsCount: '', gapBwSet: ''}])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        if (name == 'days' && Number(value) > 90) {
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
            console.log('error', error)

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

    const handleAddWorkout = (day: number) => {
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
            const arr: { day: number; workouts: string }[] = []

            for (let i = 1; i <= (form.days ?? 0); i++) {
                arr.push({ day: i, workouts: '' })
            }
            setDays(arr)
        }


        generateDays()
    }, [form.days])





    return (
        <div>
                <PageHeader onClick={gotoList} detail={true} button_text="Back to List" title='Create Plan' />
                <FormWrapper>
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
                                    return <TR key={item.day}><TD>{item.day}</TD> <TD>{item?.workouts}</TD> <TD> <button onClick={() => handleAddWorkout(item.day)}>Add</button></TD></TR>
                                })
                            }
                        </Table>
                    </div>
                    <div className='mt-8'>
                        <Button onClick={handleSubmit}> {save_icon}Submit</Button>
                    </div>
                </FormWrapper>
            

            <ModalBox open={open} setOpen={setOpen}>
                <AddWorkouts exercises={exercises} day={day ?? 1} setExercises={setExercises}></AddWorkouts>
            </ModalBox>
        </div>
    )
}

export default WorkoutPlanForm