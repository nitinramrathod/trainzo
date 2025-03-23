import UserDetail from "@/components/user/UserDetail";
import { Metadata } from "next";

const backendURL = "http://192.168.51.92:8080"

export const metadata: Metadata = {
  title: "Update Products | In House Shop",
  description: "Update Product.",
  // other metadata
};

const EditUser = async ({params}:any) => {
  console.log('===>',params?.id)
 
    const res = await fetch(`${backendURL}/api/user/${params?.id}`,{
        method: "GET",
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json",
          // Add any other necessary headers here (e.g., authentication tokens)
        },
      });
    
      // If the response is not successful, handle the error
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
    
     
      const user = await res.json();
     console.log("user", user)

   return <UserDetail data={user?.data}/>
}

export default EditUser