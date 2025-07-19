import PackageDetail from "@/components/packages/PackageDetail";
import { API_URL } from "@/utils/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Package",
  description: "Update package information",
};

const EditPackage = async ({ params }) => {
  const id = await params?.id;
  let membership;

  try {
    const res = await fetch(`${API_URL}/api/v1/membership/${id}`, {
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

    membership = await res.json();
  } catch (error) {
    console.log("error", error);
  }

  return <PackageDetail data={membership.data} />;
};

export default EditPackage;
