"use client";

import {
  backward_arrow_icon,
  dashboard_icon,
  diet_icon,
  forward_arrow_icon,
  logout_icon,
  mail_icon,
  package_icon,
  users_icon,
  workout_icon,
  workout_plan_icon,
} from "@/assets/icons/dashboard";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/utils/context/SidebarContext";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
// import { cross_icon, menu_icon } from "@/assets/icons/website";

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
        className={`${(width <= 768 && collapsed) ? "translate-x-[-110%]":"translate-x-0"} ${width <= 768 ? "fixed z-20 md:static min-w-[250px] w-[30%]" : collapsed ? "w-17" : "w-48"} h-screen transition-all duration-200 ease-in-out`}
        aria-label="Sidebar"
      >
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 7px 0px 13px 0px;' }} className={`${width <= 768 ? "rounded-tr-2xl rounded-br-2xl" :""} h-full overflow-x-hidden font-medium flex flex-col justify-between pt-2 px-3 py-4 overflow-y-auto bg-gradient-to-t from-indigo-400 to-indigo-600 dark:bg-gray-800`}>
        {width <= 768 && <button onClick={toggleSidebar} className="py-8 ps-2 rounded-br-lg rounded-tr-lg bg-indigo-800/30 backdrop-blur-[3px] w-fit absolute right-[-23px]  text-white top-[46%]" >{collapsed ? forward_arrow_icon: backward_arrow_icon }</button>}
          <div>
            {width <= 768 ? <div className="flex flex-col items-center mt-7">
              <div className="shadow-lg border-2 border-slate-100 bg-red-400 w-15 h-15 rounded-full flex items-center justify-center mb-4">
                <p className="text-white font-bold" >NR</p>
              </div>
              <div className="mb-6 flex flex-col items-center">
                <h3 className="text-center text-white text-lg">Nitin Rathod</h3>
                <p className="px-4  py-1 rounded-3xl mt-3 bg-red-200 text-[12px]">Member</p>
              </div>
                <hr className="mb-4 bg-indigo-800 w-[90%]"/>
            </div> : <h3 className="text-white text-2xl text-center mb-8 mt-4">{collapsed ? 'P' : 'Protonity'}</h3>}
            <ul className="space-y-2 mt-5">
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
