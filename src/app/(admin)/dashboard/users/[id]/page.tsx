import UserDetail from "@/components/user/UserDetail";
import { API_URL } from "@/utils/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Products | In House Shop",
  description: "Update Product.",
  // other metadata
};

const EditUser = async ({params}) => {
  console.log('===>',params?.id)
  let user;

  try {
    const res = await fetch(`${API_URL}/api/v1/user/${params?.id}`,{
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
   console.log("user", user)
    
  } catch (error) {
    console.log('error', error)
  }
 
    

   return <UserDetail data={user}/>
}

export default EditUser