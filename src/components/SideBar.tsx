"use client";

import {
  backward_arrow_icon,
  dashboard_icon,
  diet_icon,
  forward_arrow_icon,
  home_icon,
  logout_icon,
  mail_icon,
  package_icon,
  users_icon,
  workout_icon,
  workout_plan_icon,
} from "@/assets/icons/dashboard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/utils/context/SidebarContext";
import { useDeviceWidth } from "@/utils/hooks/useDeviceWidth";
import Modal from "./common/Modal";
import Button, { CancelButton } from "./forms/Button";
import { getInitials } from "@/utils/initialGenerator";
import { handleLogout } from "./Header";
import useLoggedInUser from "@/utils/hooks/useLoggedInUser";
// import { cross_icon, menu_icon } from "@/assets/icons/website";

interface SideBarProps {
  name: string;
  icon: React.ReactNode;
  url: string;
}

type TUser = {
    name: string;
    email: string;
    id: string;
}

const SideBar = () => {
  const pathname = usePathname();
  const { collapsed, toggleSidebar } = useSidebar();
  const width = useDeviceWidth();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const user = useLoggedInUser()

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
      icon: home_icon,
      url: "/",
    },
  ];



  

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`h-screen transition-all duration-200 ease-in-out ${(width <= 768 && collapsed) ? "translate-x-[-110%]":"translate-x-0"} ${width <= 768 ? "fixed z-20 md:static min-w-[250px] w-[30%]" : collapsed ? "w-17" : "w-48"}`}
        aria-label="Sidebar"
      >
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 7px 0px 13px 0px' }} className={`${width <= 768 ? "rounded-tr-2xl rounded-br-2xl" :""} h-full overflow-x-hidden font-medium flex flex-col justify-between pt-2 px-3 py-4 overflow-y-auto bg-gradient-to-t from-indigo-400 to-indigo-600 dark:bg-gray-800`}>
        {width <= 768 && <button onClick={toggleSidebar} className="py-8 ps-2 rounded-br-lg rounded-tr-lg bg-indigo-800/30 backdrop-blur-[3px] w-fit absolute right-[-23px]  text-white top-[46%]" >{collapsed ? forward_arrow_icon: backward_arrow_icon }</button>}
          <div>
            {width <= 768 ? <div className="flex flex-col items-center mt-7">
              <div className="shadow-lg border-2 border-slate-100 bg-red-400 w-15 h-15 rounded-full flex items-center justify-center mb-4">
                <p className="text-white font-bold" >{user?.name ? getInitials(user?.name) : "N"}</p>
              </div>
              <div className="mb-6 flex flex-col items-center">
                <h3 className="text-center text-white text-lg">{user?.name ? user.name : "No User"}</h3>
                <p className="px-4  py-1 rounded-3xl mt-3 bg-red-200 text-[12px]">Admin</p>
              </div>
                <hr className="mb-4 bg-indigo-800 w-[90%]"/>
            </div> : <h3 className="text-white text-2xl text-center mb-8 mt-4">{collapsed ? 'T' : 'Trainzo'}</h3>}
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
            // onClick={handleLogout}
          />
        </div>
      </aside>

        <Modal open ={deleteModal} setOpen={setDeleteModal} backgroundBlur={true} position='top' title="Logout from system?">
            <div className='flex flex-col items-start justify-start h-full md:w-sm'>               
                    <p className='text-gray-600 text-md'>
                        Are you sure you want to logout? You will be redirected to the login page.
                    </p>
                    <div className='mt-6 flex justify-end w-full gap-3'>
                    <CancelButton>Cancel</CancelButton>
                    <Button>Confirm</Button>
                </div>
            </div>
        </Modal>
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
      className={`flex group items-center transition-all duration-700 ease-in-out px-1.5 py-1.5  rounded-3xl ${
        isActive ? "text-indigo-800 bg-indigo-50/30" : "text-slate-200"
      } hover:text-indigo-800 dark:text-white hover:bg-indigo-50/30 dark:hover:bg-gray-600 group`}
    >
      <span className={`${isActive ? "bg-indigo-100/50 " : ""} p-1 text-2xl group-hover:bg-indigo-100/50 rounded-full transition-all duration-700 ease-in-out`}>
      {icon}
      </span>
      {!isCollapsed && (
        <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
      )}
    </Link>
  );
};

export default SideBar;
