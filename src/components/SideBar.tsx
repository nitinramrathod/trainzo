"use client";

import {
  dashboard_icon,
  diet_icon,
  logout_icon,
  mail_icon,
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
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import { cross_icon, menu_icon } from "@/assets/icons/website";

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
    },
    {
      name: "Enquiries",
      icon: mail_icon,
      url: "/dashboard/enquiries",
    },
    {
      name: "Website",
      icon: mail_icon,
      url: "/",
    },
  ];

  const pathname = usePathname();

  const { collapsed, toggleSidebar } = useSidebar();
  const width = useDeviceWidth();



  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`${(width <= 768 && collapsed) ? "translate-x-[-100%]":"translate-x-0"} ${width <= 768 ? "fixed z-20 md:static min-w-[250px] w-[30%]" : collapsed ? "w-17" : "w-48"} h-screen transition-all duration-200 ease-in-out`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-x-hidden font-medium flex flex-col justify-between pt-2 px-3 py-4 overflow-y-auto bg-gradient-to-t from-indigo-400 to-indigo-600 dark:bg-gray-800">
        {width <= 768 && <button onClick={toggleSidebar} className="p-2 bg-indigo-500 w-fit absolute right-[-43px]  text-white top-0" >{collapsed ? menu_icon : cross_icon}</button>}
          <div>
            <h2 className="text-center mb-12 text-xl ">
              {collapsed ? (
                <span className="text-slate-50 text-3xl">P</span>
              ) : (
                <Image src={logo} alt="Protonity Gym Softwares"></Image>
              )}
            </h2>
            <ul className="space-y-2">
              {sidebarLinks?.map((item: SideBarProps) => (
                <li key={item?.url}>
                  <NavLink
                    url={item?.url}
                    isActive={item.url == pathname}
                    icon={item?.icon}
                    isCollapsed={collapsed}
                    title={item.name}
                  />
                </li>
              ))}
            </ul>
          </div>
          <NavLink
            url="logout"
            icon={logout_icon}
            isCollapsed={collapsed}
            title="Logout"
          />
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
      href={url || "#"}
      className={`flex items-center transition-all duration-700 ease-in-out px-2 py-1.5  rounded-md ${
        isActive ? "text-indigo-800 bg-indigo-200" : "text-slate-100"
      } hover:text-indigo-800 dark:text-white hover:bg-indigo-200 dark:hover:bg-gray-600 group`}
    >
      {icon}
      {!isCollapsed && (
        <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
      )}
    </Link>
  );
};

export default SideBar;
