import UserDetail from "@/components/user/UserDetail";
import { API_URL } from "@/utils/services/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Products | In House Shop",
  description: "Update Product.",
  // other metadata
};

const EditUser = async ({params}) => {
  let user;
  const id = await params.id

  try {
    const res = await fetch(`${API_URL}/api/v1/user/${id}`,{
      method: "GET",
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json",
        // Add any other necessary headers here (e.g., authentication tokens)
      },
    });

    console.log('res===>',res)
  
    // If the response is not successful, handle the error
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  
   
    user = await res.json();
    
  } catch (error) {
    console.log('error', error)
  }

  console.log('user.data', user?.data)
 
    

   return <UserDetail data={user?.data} id={id}/>
}

export default EditUser