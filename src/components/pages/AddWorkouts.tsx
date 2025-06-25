import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import NoDataFound from "../table/NoDataFound";
import Table from "../table/Table";
import { ActionTD, TD, TR } from "../table/Common";
import Input from "../forms/Input";
import Select from "../forms/Select";
import { get } from "@/utils/services";
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

const data = { uniqueId: 0, workoutId : "", setCount: 0, repsCount: "", gapBwSet: "" };
export interface Exercise {
  uniqueId?: string | number;
  workoutId?: string | number;
  setCount?: number;
  repsCount?: string;
  gapBwSet?: string;
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
      const options = res.map((item) => {
        return {
          value: String(item.id),
          label: item.workoutName,
        };
      });
      setWorkoutOptions(options);
    });
  }, []);


  const handleInput = (e, exerciseNumber) => {
    debugger;
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

  console.log("exercises", exercises);

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

    const updatedDays = prev?.days?.map((item) => {
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
      days: updatedDays,
    };
  });
  setOpen(false)
};

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="mb-5">
          Day: <span> {day} </span>
        </h2>
        <Button onClick={addNewRow}>{create_icon} Add Workout</Button>
      </div>

      <Table headers={headers}>
        {exercises?.length > 0 ? (
          exercises?.map((item, index) => (
            <TR key={`exercise-${index}-day-${day}`}>
              <TD>
                <Select options={workoutOptions} noLabel={true}></Select>
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item?.setCount || ""}
                  name="setCount"
                  noLabel={true}
                  type="number"
                  placeholder="Eg. 2"
                />
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item.repsCount || ""}
                  name="repsCount"
                  noLabel={true}
                  type="text"
                  placeholder="Eg. 1st set 16, 2nd set 12"
                />
              </TD>
              <TD>
                <Input
                  onChange={(e) => handleInput(e, ++index)}
                  value={item.gapBwSet || ""}
                  name="gapBwSet"
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
