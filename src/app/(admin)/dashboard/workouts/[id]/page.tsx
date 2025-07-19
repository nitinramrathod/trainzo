import WorkoutForm from "@/components/workouts/WorkoutForm";
import { API_URL } from "@/utils/services";

const EditWorkout = async({params}) => {
    const id = await params?.id;
    let workout;

  try {
    const res = await fetch(`${API_URL}/api/v1/workout/${id}`, {
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

    workout = await res.json();
  } catch (error) {
    console.log("error", error);
  }
  console.log('workout', workout)
    return (
        <WorkoutForm data={workout?.data}/>
    )
}

export default EditWorkout