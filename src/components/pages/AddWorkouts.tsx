import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import NoDataFound from "../table/NoDataFound";
import Table from "../table/Table";
import { ActionTD, TD, TR } from "../table/Common";
import Input from "../forms/Input";
import Select from "../forms/Select";
import { get } from "@/utils/services/services";
import Button from "../forms/Button";
import { WorkoutDay, WorkoutPlan } from "../workout-plan/WorkoutPlanForm";
import { create_icon, delete_icon, save_icon } from "@/assets/icons/dashboard";

const headers = [
  {
    title: "Workout",
  },
  {
    title: "Sets",
  },
  {
    title: "Repitition",
  },
  {
    title: "Gaps",
  },
  {
    title: "Action",
  },
];

const data = { uniqueId: 0, workout_id : "", sets: 0, repetition: "", gap: "" };
export interface Exercise {
  uniqueId?: string | number;
  workout_id?: string | number;
  sets?: number;
  repetition?: string;
  gap?: string;
  [key: string]: string | number | undefined;
}

interface AddWorkoutsProps {
  day: number;
  setWorkoutPlan: Dispatch<SetStateAction<WorkoutPlan>>;
  workoutPlanDays: WorkoutDay[];
  setOpen: (open: boolean) => void;
}

const AddWorkouts = ({ day, setOpen, workoutPlanDays, setWorkoutPlan }: AddWorkoutsProps) => {
  const [workoutOptions, setWorkoutOptions] =
    useState<{ value: string; label: string }[]>();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const dataForDay = workoutPlanDays?.find((item) => item?.day == day);
    setExercises(dataForDay?.exercises || []);
  }, [day, workoutPlanDays]);

  useEffect(() => {
    get("/api/v1/workout").then((res) => {
      
      const options = res.data.map((item) => {
        return {
          value: String(item._id),
          label: item.name,
        };
      });
      setWorkoutOptions(options);
    });
  }, []);


  const handleInput = (e, exerciseNumber) => {
    
    const { name, value } = e.target;

    setExercises((prev) =>
      prev.map((item) => {
        if (item.uniqueId == exerciseNumber) {
         return{
            ...item,
            [name]:value
         }
        }

        return item;
      })
    );
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, exerciseNumber) => {
    
    
    const { name, value } = e.target;

    setExercises((prev) =>
      prev.map((item) => {
        if (item.uniqueId == exerciseNumber) {
         return{
            ...item,
            [name]:value
         }
        }

        return item;
      })
    );
  };

  const addNewRow = () => {
    const row: Exercise = {
      ...data,
      uniqueId: `${exercises?.length +1}`
    };
    setExercises((prev) => [...prev, row]);
  };

 const saveExercises = () => {
  setWorkoutPlan((prev) => {
    if (!prev) return prev;

    const updatedDays = prev?.workouts?.map((item) => {
      if (item.day === day) {
        return {
          ...item,
          exercises: exercises, // Replace only exercises for the matching day
        };
      }
      return item;
    });

    return {
      ...prev,
      workouts: updatedDays,
    };
  });
  setOpen(false)
};

  return (
    <div className="w-full pt-7">
      <div className="flex justify-between items-center mb-5">
        <h2 className="mb-5">
          Day: <span> {day} </span>
        </h2>
        <Button onClick={addNewRow}>{create_icon} Add Workout</Button>
      </div>

      <Table searchable={false} pagination={false} headers={headers}>
        {exercises?.length > 0 ? (
          exercises?.map((item, index) => (
            <TR key={`exercise-${index}-day-${day}`}>
              <TD>
                <Select value={item?.workout_id} name="workout_id" onChange={ (e)=>handleSelect(e, ++index)} options={workoutOptions} noLabel={true}></Select>
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item?.sets || ""}
                  name="sets"
                  noLabel={true}
                  type="number"
                  placeholder="Eg. 2"
                />
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item.repetition || ""}
                  name="repetition"
                  noLabel={true}
                  type="text"
                  placeholder="Eg. 1st set 16, 2nd set 12"
                />
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item.gap || ""}
                  name="gap"
                  noLabel={true}
                  type="text"
                  placeholder="Eg. 2 Minutes"
                />
              </TD>
<ActionTD>

              <button className="text-red-400 cursor-pointer">{delete_icon}</button>
</ActionTD>
            </TR>
          ))
        ) : (
          <NoDataFound colSpan={headers?.length} />
        )}
      </Table>

      <Button className="mt-5" onClick={saveExercises}>{save_icon} Save</Button>
    </div>
  );
};

export default AddWorkouts;
