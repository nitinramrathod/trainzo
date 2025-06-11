"use client";
import { edit_icon, save_icon } from "@/assets/icons/dashboard";
import Button from "@/components/forms/Button";
import FormWrapper from "@/components/forms/FormWrapper";
import Input from "@/components/forms/Input";
import { ModalBox } from "@/components/Modal";
import PageHeader from "@/components/PageHeader";
import AddWorkouts, { Exercise } from "@/components/pages/AddWorkouts";
import { TR, TD } from "@/components/table/Common";
import Table from "@/components/table/Table";
import { API_URL } from "@/utils/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define Exercise type here if the import fails
interface FormTypes {
  workoutPlanName?: string | undefined;
  id?: string;
  days?: number;
  exercises?: Exercise[] | undefined;
}
interface ErrorObject {
  workoutPlanName?: string;
}
export interface WorkoutDay {
  day: number;
  exercises: Exercise[];
}
export interface WorkoutPlan {
  workoutPlanName?: string;
  daysCount?: number | string;
  days?: WorkoutDay[];
}

const WorkoutPlanForm = ({ data }: { data?: FormTypes }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<ErrorObject>({});
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [day, setDay] = useState<number | undefined>();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "daysCount" && Number(value) > 90 || Number(value)< 1) {
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
        ? `${API_URL}/api/v1/workout-plan/update`
        : `${API_URL}/api/v1/workout-plan/create`;
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
    //   setForm(data);
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

      const daysCount = Number(workoutPlan?.daysCount ?? 0);
      for (let i = 1; i <= daysCount; i++) {
        arr.push({
          day: i,
          exercises: [
            {
              uniqueId: 1,
              setCount: 0,
              repsCount: "",
              gapBwSet: "",
              workoutId: 1,
            },
          ],
        });
      }
      setWorkoutPlan((prev) => ({
        ...prev,
        days: arr,
      }));
    };

    generateDays();
  }, [workoutPlan?.daysCount]);

  console.log("workoutPlan", workoutPlan);

  return (
    <div>
      <PageHeader
        onClick={gotoList}
        detail={true}
        button_text="Back to List"
        title="Create Plan"
      />
      <FormWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
          <Input
            label="Plan Name"
            value={workoutPlan?.workoutPlanName}
            placeholder="Enter Plan Name"
            name="workoutPlanName"
            onChange={handleInputChange}
            error={error?.workoutPlanName || ""}
          />

          <Input
            label="Enter Days"
            value={workoutPlan?.daysCount}
            placeholder="Enter daysCount"
            name="daysCount"
            type="number"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Table headers={headers}>
            { workoutPlan?.days && workoutPlan?.days?.length > 0 ?
              workoutPlan?.days?.map((item) => {
                return (
                  <TR key={item.day}>
                    <TD>{item.day}</TD>
                    <TD>
                      {item?.exercises?.map((exercise) => (
                        <p key={exercise?.uniqueId}>{exercise?.workoutId}</p>
                      ))}
                    </TD>{" "}
                    <TD className="w-[100px]">
                      <button className="cursor-pointer text-indigo-400" onClick={() => handleAddWorkout(item.day)}>
                        {edit_icon}
                      </button>
                    </TD>
                  </TR>
                );
              }): <TR> <TD>Add Days to edit</TD></TR>}
          </Table>
        </div>
        <div className="mt-8">
          <Button onClick={handleSubmit}> {save_icon}Submit</Button>
        </div>
      </FormWrapper>

      <ModalBox open={open} setOpen={setOpen}>
        <AddWorkouts
          workoutPlanDays={workoutPlan?.days || []}
          setWorkoutPlan={setWorkoutPlan}
          day={day ?? 1}
          setOpen={setOpen}
        ></AddWorkouts>
      </ModalBox>
    </div>
  );
};

export default WorkoutPlanForm;
