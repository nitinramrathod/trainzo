import WorkoutPlanForm from "@/components/workout-plan/WorkoutPlanForm"
import { API_URL } from "@/utils/services/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update workout plan",
  description: "Workout plan information",
};

interface PageProps {
  params: { id: string };
}


const CreateWorkoutPlan = async({params}: PageProps) => {
const id = params?.id;
  let workoutPlan;

  try {
    const res = await fetch(`${API_URL}/api/v1/workout-plan/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        // Add any other necessary headers here (e.g., authentication tokens)
      },
    });

    // If the response is not successful, handle the error
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    workoutPlan = await res.json();
  } catch (error) {
    console.log("error", error);
  }

  console.log('workoutPlan', workoutPlan.data)

    return (
        <WorkoutPlanForm data={workoutPlan?.data}/>
    )
}

export default CreateWorkoutPlan