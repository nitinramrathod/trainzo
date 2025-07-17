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
import Textarea from "../forms/Textarea";

interface FormTypes {
  name?: string | undefined;
  email?: string;
  username?: string;
  address?: string;
  photo?: string;
  contact?: string;
  dob?: string;
  paid_fees?: string;
  role?: string;
  gender?: string;
  joining_date?: string;
  pkgStartDate?: string;
  gym_package?: string;
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
function UserDetail({ data }: { data?: FormTypes }) {
  const [form, setForm] = useState<FormTypes>({});
  const [isEdit, setIsEdit] = useState(false);
  interface Package {
    _id: string;
    name: string;
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
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getOptions = async () => {
    const data = await get("/api/v1/membership");
    setDropdown({ packages: data?.data });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form?.name || "");
      formData.append("email", form?.email || "");
      formData.append("username", form?.username || "hello");
      formData.append("address", form?.address || "");
      formData.append("contact", form?.contact || "");
      formData.append("dob", form?.dob || "");
      formData.append("paid_fees", form?.paid_fees || "");
      formData.append("gender", form?.gender || "");
      formData.append("gym_package", form?.gym_package || "");
      formData.append("role", form?.role || "");
      formData.append("joining_date", form?.joining_date || "");
      if (isEdit) {
        formData.append("id", form?.id || "");
      }

      if (form.photo) {
        formData.append("photo", form.photo);
      }

      const url = isEdit ? `${API_URL}/api/v1/user` : `${API_URL}/api/v1/user`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
      });

      if (res.ok) {
        setForm({});
        router.push("/dashboard/users");
      } else {
        const errorText = await res.text();
        setError(JSON.parse(errorText)?.errors);
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
          {/* <ImageSelector
          name="photo"
          defaultSrc={
            (form?.photo && typeof form.photo === "string")
              ? `${API_URL}/${form?.photo}`
              : 'ddd'
          }
          onChange={handleImageChange}
          />  */}
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
            value={form?.contact}
            placeholder="Enter Mobile Number"
            type="text"
            name="contact"
            onChange={handleInputChange}
            error={error?.contact || ""}
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

          <Textarea
            label="Enter Address"
            value={form?.address}
            placeholder="Enter Address"
            name="address"
            onChange={handleTextareaChange}
            error={error?.address || ""}
          />

          <Input
            label="Enter Start Date"
            value={form?.joining_date}
            placeholder="Enter joining_date"
            type="date"
            name="joining_date"
            onChange={handleInputChange}
            error={error?.joining_date || ""}
          />
          <div>
            <label
              htmlFor=""
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <div className="flex gap-2 pl-1 pt-2">
              <div className="flex gap-1 items-center">
                <input
                  onChange={handleRadioChange}
                  type="radio"
                  value={"male"}
                  name="gender"
                  id="male"
                />
                <label htmlFor="male">Male</label>
              </div>

              <div className="flex gap-1 items-center">
                <input
                  onChange={handleRadioChange}
                  type="radio"
                  value={"female"}
                  checked={form?.gender === 'female'}
                  name="gender"
                  id="female"
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="flex gap-1 items-center">
                <input
                  type="radio"
                  onChange={handleRadioChange}
                  value={"other"}
                  name="gender"
                  id="other"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <Input
            label="Enter DOB"
            value={form?.dob}
            placeholder="Enter dob"
            type="date"
            name="dob"
            onChange={handleInputChange}
            error={error?.dob || ""}
          />
          <Input
            label="Enter Paid Fees"
            value={form?.paid_fees}
            placeholder="Enter Paid Fees"
            type="number"
            name="paid_fees"
            onChange={handleInputChange}
            error={error?.paid_fees || ""}
          />
          <Select
            onChange={handleSelectChange}
            label="Gym Package"
            name="gym_package"
            value={form?.gym_package}
            options={dropdown?.packages?.map((item: Package) => ({
              value: item?._id,
              label: item?.name,
            }))}
          />

          <Select
            onChange={handleSelectChange}
            label="Workout Plan"
            name="workoutPlanId"
            value={form?.workoutPlanId}
            options={dropdown?.packages?.map((item: Package) => ({
              value: item?._id,
              label: item?.name,
            }))}
          />
          <Select
            onChange={handleSelectChange}
            label="Role"
            name="role"
            value={form?.role}
            options={[
              { label: "User", value: "user" },
              { label: "Trainer", value: "trainer" },
              { label: "Admin", value: "admin" },
            ]}
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
