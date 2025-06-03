"use client";

import {
  dashboard_icon,
  diet_icon,
  logout_icon,
  package_icon,
  users_icon,
  workout_icon,
  workout_plan_icon,
} from "@/assets/icons/dashboard";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/assets/icons/logo.png";
import { usePathname } from "next/navigation";

interface SideBarProps {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const SideBar = () => {
  const sidebarLinks = [
    {
      name: "Dashboard",
      icon: dashboard_icon,
      url: "/dashboard",
    },
    {
      name: "Users",
      icon: users_icon,
      url: "/dashboard/users",
    },
    {
      name: "Package",
      icon: package_icon,
      url: "/dashboard/packages",
    },
    {
      name: "Diet",
      icon: diet_icon,
      url: "/dashboard/diets",
    },
    {
      name: "Workout",
      icon: workout_icon,
      url: "/dashboard/workouts",
    },
    {
      name: "Workout Plans",
      icon: workout_plan_icon,
      url: "/dashboard/workout-plans",
    }
  ];

  const pathname = usePathname();

  console.log('pathname', pathname)


  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full  font-medium flex flex-col justify-between pt-2 px-3 py-4 overflow-y-auto bg-gradient-to-t from-indigo-400 to-indigo-600 dark:bg-gray-800">
          <div>

        
          <h2 className="text-center mb-12 text-xl ">
            <Image src={logo} alt="Protonity Gym Softwares"></Image>
          </h2>
          <ul className="space-y-2">
            {/* <li>
                            <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" className="hidden py-2 space-y-2">
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li>
                      
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li> */}

            {sidebarLinks?.map((item: SideBarProps) => (
              <li key={item?.url}>
                <Link
                  href={item?.url || "#"}
                  className={`flex items-center transition-all duration-700 ease-in-out p-2  rounded-md ${item.url == pathname ? 'text-indigo-800 bg-indigo-200': 'text-slate-100'} hover:text-indigo-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-gray-600 group`}
                >
                  {item.icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
            </div>
            <Link
                  href={ "#"}
                  className="flex items-center transition-all duration-700 ease-in-out p-2 text-slate-100 rounded-md hover:text-indigo-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-gray-600 group"
                >
                  {logout_icon}
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Logout
                  </span>
                </Link>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
