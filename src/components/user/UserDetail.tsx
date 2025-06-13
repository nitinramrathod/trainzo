"use client";
import { save_icon } from "@/assets/icons/dashboard";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import PageHeader from "@/components/PageHeader";
import { API_URL, get } from "@/utils/services";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImageSelector from "../forms/ImageSelector";

interface FormTypes {
  name?: string | undefined;
  email?: string;
  username?: string;
  address?: string;
  photo?: string;
  mob?: string;
  pkgStartDate?: string;
  pkgId?: string;
  workoutPlanId?: string | number;
  id?: string;
}

interface ErrorObject {
  email?: string;
  mob?: string;
  name?: string;
  address?: string;
  [key: string]: string | undefined;
}
function UserDetail({ data }: {data?: FormTypes}) {
  const [form, setForm] = useState<FormTypes>({});
  const [isEdit, setIsEdit] = useState(false);
  interface Package {
    id: string;
    pkgName: string;
  }
  
  const [dropdown, setDropdown] = useState<{ packages?: Package[] }>({});
  const [error, setError] = useState<ErrorObject>({});
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({
      ...prev,
      [e.target.name]: file || null,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getOptions = async () => {
    const data = await get("/api/v1/gym-package");
    setDropdown({ packages: data });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form?.name || "");
      formData.append("email", form?.email || "");
      formData.append("username", form?.username || "hello");
      formData.append("address", form?.address || "");
      formData.append("mob", form?.mob || "");
      formData.append("pkgId", form?.pkgId || "");
      formData.append("pkgStartDate", form?.pkgStartDate || "");
      if (isEdit) {
        formData.append("id", form?.id || "");
      }

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      const url = isEdit
        ? `${API_URL}/api/v1/user/update`
        : `${API_URL}/api/v1/user/create`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      if (res.ok) {
        setForm({});
        router.push("/dashboard/users");
      } else {
        const errorText = await res.text(); // Try to get error details
        console.log("Error Response:", errorText); // Log the actual error
        setError(JSON.parse(errorText));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const route = useRouter();
  const gotoList = () => {
    route.push("/dashboard/users");
  };

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setIsEdit(true);
      setForm(data);
    }
  }, [data]);

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div>
      <PageHeader
        onClick={gotoList}
        button_text="Back to List"
        title="Create User"
        detail={true}
      />
      <div className="bg-white shadow-md py-8 px-5 rounded-md">
        <div className="mb-5">
           <ImageSelector
          name="photo"
          defaultSrc={
            (form?.photo && typeof form.photo === "string")
              ? `${API_URL}/${form?.photo}`
              : ''
          }
          onChange={handleImageChange}
          /> 
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4">
                
          <Input
            label="Enter Name"
            value={form?.name}
            placeholder="Enter Name"
            name="name"
            onChange={handleInputChange}
            error={error?.name || ""}
          />

          
          <Input
            label="Enter Mobile"
            value={form?.mob}
            placeholder="Enter Mobile Number"
            type="tel"
            name="mob"
            onChange={handleInputChange}
            error={error?.mob || ""}
          />
          <Input
            label="Enter Email"
            value={form?.email}
            placeholder="Enter Email"
            name="email"
            type="email"
            onChange={handleInputChange}
            error={error?.email || ""}
          />
           <Input
            label="Enter Address"
            value={form?.address}
            placeholder="Enter Address"
            name="address"
            onChange={handleInputChange}
            error={error?.address || ""}
          />
          <Input
            label="Enter Start Date"
            value={form?.pkgStartDate}
            placeholder="Enter pkgStartDate"
            type="date"
            name="pkgStartDate"
            onChange={handleInputChange}
            error={error?.pkgStartDate || ""}
          />
          <Input
            label="Enter Paid Fees"
            value={form?.pkgStartDate}
            placeholder="Enter Paid Fees"
            type="number"            
            name="pkgStartDate"
            onChange={handleInputChange}
            error={error?.pkgStartDate || ""}
          />
          <Select
            onChange={handleSelectChange}
            label="Gym Plan"
            name="pkgId"
            value={form?.pkgId}
            options={dropdown?.packages?.map((item: Package) => ({
              value: item?.id,
              label: item?.pkgName,
            }))}
          />
          <Select
            onChange={handleSelectChange}
            label="Workout Plan"
            name="workoutPlanId"
            value={form?.workoutPlanId}
            options={dropdown?.packages?.map((item: Package) => ({
              value: item?.id,
              label: item?.pkgName,
            }))}
          />
          {/* <Select
            onChange={handleInputChange}
            name="gymPkgId"
            options={dropdown?.packages?.map((item: Package) => ({
              value: item?.id,
              label: item?.pkgName,
            }))}
          /> */}
        </div>
        <div className="mt-8">
          <Button onClick={handleSubmit}>{save_icon}Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
