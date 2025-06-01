import PackageDetail from "@/components/packages/PackageDetail";
import { API_URL } from "@/utils/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Package",
  description: "Update package information",
};


const EditPackage = async ({params}) => {
  console.log('===>',params?.id)
  // let user;
  let packageinfo;

  try {
    const res = await fetch(`${API_URL}/api/v1/gym-package/${params?.id}`,{
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
  
   
   packageinfo = await res.json();
   console.log("user", packageinfo)
    
  } catch (error) {
    console.log('error', error)
  }
 
    

   return <PackageDetail data={packageinfo}/>
}

export default EditPackage