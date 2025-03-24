import PackageDetail from "@/components/packages/PackageDetail";
import { Metadata } from "next";

const backendURL = "http://192.168.51.92:8080"

export const metadata: Metadata = {
  title: "Update Package",
  description: "Update package information",
  // other metadata
};


const EditPackage = async ({params}) => {
  console.log('===>',params?.id)
  // let user;
  let packageinfo;

  try {
    const res = await fetch(`${backendURL}/api/v1/gym-package/${params?.id}`,{
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