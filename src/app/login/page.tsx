"use client";
import Button from "@/components/forms/Button";
// import Input from '@/components/forms/Input'
import Link from "next/link";
import React, { useState } from "react";
import landingImage from "@/assets/images/landing-image-1.png";
import { mail_icon } from "@/assets/icons/dashboard";
import { lock_icon } from "@/assets/icons/website";

interface FormTypes {
  password?: string | undefined;
  email_id?: string;
}

// interface ErrorObject {
//     email_id?: string,
//     password?: string,

// }

const Page = () => {
  const [form, setForm] = useState<FormTypes>({});
  // const [error, setError] = useState<ErrorObject>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email_id", form?.email_id || "");
      formData.append("password", form?.password || "");

      const res = await fetch(
        "https://admin-timely.tantra-gyan.com/api/v1/login",
        // const res = await fetch('http://127.0.0.1:3700/api/v1/login',
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (res.ok) {
        setForm({});
      } else {
        const errorText = await res.text(); // Try to get error details
        console.log("Error Response:", errorText); // Log the actual error
        // setError(JSON.parse(errorText));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${landingImage.src})` }}
      className="flex items-center bg-gray-200 px-4 justify-center h-screen"
    >
      <div className="rounded-2xl shadow-lg bg-white backdrop-blur-lg border-1 border-white px-8 py-12 min-w-[340px] max-w-[380px] w-[90%]">
        <h2 className="text-[2.5rem] mb-[-10px]  text-indigo-500 font-bold text-center">
          Welcome
        </h2>
        <p className="text-center text-gray-500">Login with email</p>
        <div className="flex mt-12 flex-col gap-10 mb-4">
          <div className="relative flex items-center gap-2 px-3 py-2 bg-transparent rounded-lg border-1 border-indigo-500">
            <label
              htmlFor="email"
              className="absolute top-[-11px] bg-white px-1 text-sm text-indigo-500"
            >
              Email
            </label>
            <span className="text-lg"> {mail_icon}</span>
            <input
              type="text"
              name="email_id"
              onChange={handleInputChange}
              id="email"
              placeholder="Enter email"
              className="bg-transparent w-full outline-0"
            />
          </div>

          <div className="relative flex items-center gap-2 px-3 py-2 bg-transparent rounded-lg border-1 border-indigo-500">
            <label
              htmlFor="email"
              className="absolute top-[-11px] bg-white px-1 text-sm text-indigo-500"
            >
              Password
            </label>
            <span className="text-lg"> {lock_icon}</span>
            <input
              name="password"
              type="password"
              onChange={handleInputChange}
              id="email"
              placeholder="Enter password"
              className="bg-transparent w-full outline-0"
            />
          </div>
        </div>
        <Link
          href="/forgot-password"
          className="text-end text-gray-600 block text-sm"
        >
          Forgot Password?
        </Link>
        <Button className="w-full mt-10 py-3 rounded-lg" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Page;
