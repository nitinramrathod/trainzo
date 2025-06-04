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
import { useSidebar } from "@/utils/context/SidebarContext";

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

  const { collapsed } = useSidebar();


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
        className={`top-0 left-0 z-40 ${collapsed ? 'w-17' : 'w-48'} h-screen transition-all duration-200 ease-in-out -translate-x-full sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-x-hidden font-medium flex flex-col justify-between pt-2 px-3 py-4 overflow-y-auto bg-gradient-to-t from-indigo-400 to-indigo-600 dark:bg-gray-800">
          <div>

        
          <h2 className="text-center mb-12 text-xl ">
            {collapsed ? <span className="text-slate-50 text-3xl">P</span>
            :
            <Image src={logo} alt="Protonity Gym Softwares"></Image>
          }
          </h2>
          <ul className="space-y-2">
            {sidebarLinks?.map((item: SideBarProps) => (
              <li key={item?.url}>
                <NavLink url={item?.url} isActive={item.url == pathname } icon={item?.icon} isCollapsed={collapsed} title={item.name}/>              
              </li>
            ))}
          </ul>
            </div>
            <NavLink url="logout" icon={logout_icon} isCollapsed={collapsed} title="Logout"/>              
            
        </div>
      </aside>
    </>
  );
};

interface NavLinkProps {
  url: string;
  icon: React.ReactNode;
  title: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const NavLink = ({ url, icon, isActive, title, isCollapsed }: NavLinkProps) => {
  return (
    <Link
      href={url || '#'}
      className={`flex items-center transition-all duration-700 ease-in-out p-2  rounded-md ${isActive ? 'text-indigo-800 bg-indigo-200': 'text-slate-100'} hover:text-indigo-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-gray-600 group`}
    >
      {icon}
      {!isCollapsed && (
        <span className="flex-1 ms-3 whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
};

export default SideBar;
