import WorkoutPlanForm from "@/components/workout-plan/WorkoutPlanForm";
import { API_URL } from "@/utils/services/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update workout plan",
  description: "Workout plan information",
};

const CreateWorkoutPlan = async ({params}) => {
  const id = await params.id;
  let workoutPlan;

  try {
    const res = await fetch(`${API_URL}/api/v1/workout-plan/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workout plan");
    }

    workoutPlan = await res.json();
  } catch (error) {
    console.error("error", error);
  }

  console.log("workoutPlan", workoutPlan?.data);

  return <WorkoutPlanForm data={workoutPlan?.data} />;
};

export default CreateWorkoutPlan;
