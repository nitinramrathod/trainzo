"use client";
import { edit_icon, save_icon } from "@/assets/icons/dashboard";
import Button from "@/components/forms/Button";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
// import { ModalBox } from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import AddWorkouts, { Exercise } from "@/components/pages/AddWorkouts";
import { TR, TD, ActionTD } from "@/components/table/Common";
import Table from "@/components/table/Table";
import { API_URL } from "@/utils/services/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Textarea from "../forms/Textarea";

// Define Exercise type here if the import fails
interface FormTypes {
  name?: string | undefined;
  _id?: string;
  days?: number;
  exercises?: Exercise[] | undefined;
}
interface ErrorObject {
  name?: string;
  description?: string;
  days?: string;
  workouts?: string;
}
export interface WorkoutDay {
  day: number;
  exercises: Exercise[];
}
export interface WorkoutPlan {
  name?: string;
  days?: number | string;
  description?: string;
  workouts?: WorkoutDay[];
}

const WorkoutPlanForm = ({ data }: { data?: FormTypes }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<ErrorObject>({});
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [day, setDay] = useState<number | undefined>();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name == "days" && Number(value) > 90 || Number(value)< 1) {
      alert("Days cannot be less than 1 or more than 90");
      return;
    }
    setWorkoutPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = isEdit
        ? `${API_URL}/api/v1/workout-plan/${data?._id}`
        : `${API_URL}/api/v1/workout-plan`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(workoutPlan),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setWorkoutPlan({});
        router.push("/dashboard/workout-plans");
      } else {
        const errorText = await res.text(); // Try to get error details
        console.log("Error Response:", errorText);
        setError(JSON.parse(errorText));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const route = useRouter();
  const gotoList = () => {
    route.push("/dashboard/workout-plans");
  };

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      setWorkoutPlan(data);
    }
  }, [data]);

  const headers = [
    {
      title: "Day",
    },
    {
      title: "Workouts",
    },
    {
      title: "Action",
    },
  ];

  const handleAddWorkout = (day: number) => {
    setDay(day);
    setOpen(true);
  };

  useEffect(() => {
    const generateDays = () => {
      const arr: WorkoutDay[] = [];

      const days = Number(workoutPlan?.days ?? 0);
      for (let i = 1; i <= days; i++) {
        arr.push({
          day: i,
          exercises: [
            {
              uniqueId: 1,
              sets: 0,
              repetition: "",
              gap: "",
              workout_id: "",
            },
          ],
        });
      }
      setWorkoutPlan((prev) => ({
        ...prev,
        workouts: arr,
      }));
    };

    if(!data){
      generateDays();
    }
  }, [workoutPlan?.days, data]);

  console.log('workoutPlan==>', workoutPlan)

  return (
    <div>
      <PageHeader
        onClick={gotoList}
        detail={true}
        button_text="Back to List"
        title={`${isEdit ? 'Edit Workout Plan': 'Create Workout Plan'}`}
      />
      <FormWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
          <Input
            label="Plan Name"
            value={workoutPlan?.name}
            placeholder="Enter Plan Name"
            name="name"
            onChange={handleInputChange}
            error={error?.name || ""}
          />

          <Input
            label="Enter Days"
            value={workoutPlan?.days}
            placeholder="Enter days"
            disabled={isEdit}
            name="days"
            type="number"
            onChange={handleInputChange}
          />
          <Textarea
            label="Enter Description"
            value={workoutPlan?.description}
            placeholder="Enter description"
            name="description"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Table searchable={false} pagination={false} headers={headers}>
            { workoutPlan?.workouts && workoutPlan?.workouts?.length > 0 ?
              workoutPlan?.workouts?.map((item) => {
                return (
                  <TR key={item.day}>
                    <TD>{item.day}</TD>
                    <TD>
                      {item?.exercises?.map((exercise) => (
                        <p key={exercise?.uniqueId}>{exercise?.workout_id}</p>
                      ))}
                    </TD>{" "}
                    <ActionTD>
                      <button className="cursor-pointer text-indigo-400" onClick={() => handleAddWorkout(item.day)}>
                        {edit_icon}
                      </button>
                    </ActionTD>
                  </TR>
                );
              }): <TR> 
                <TD colSpan={headers.length} className="text-center text-lg font-bold" >
                Add Days to Edit</TD>
                </TR>}
          </Table>
        </div>
        <div className="mt-8">
          <Button onClick={handleSubmit}> {save_icon}Submit</Button>
        </div>
      </FormWrapper>

      <Modal open={open} setOpen={setOpen}>
        <AddWorkouts
          workoutPlanDays={workoutPlan?.workouts || []}
          setWorkoutPlan={setWorkoutPlan}
          day={day ?? 1}
          setOpen={setOpen}
        ></AddWorkouts>
      </Modal>
    </div>
  );
};

export default WorkoutPlanForm;
