"use client";
import { left_panel_close, left_panel_open } from "@/assets/icons/dashboard";
import { useSidebar } from "@/utils/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { getInitials } from "@/utils/initialGenerator";
import useLoggedInUser from "@/utils/hooks/useLoggedInUser";
import { Bell } from "lucide-react";

type TPopover = {
  menu: boolean;
  notification: boolean;
};

export const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
  Cookies.remove("token");
};

const Header = () => {
  const { toggleSidebar, collapsed } = useSidebar();
  const [showMenu, setShowMenu] = useState<TPopover>({
    menu: false,
    notification: false,
  });
  const user = useLoggedInUser();

  // refs for popovers
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = (name: keyof TPopover): void => {
    setShowMenu((prev) => ({
      menu: name === "menu" ? !prev.menu : false,
      notification: name === "notification" ? !prev.notification : false,
    }));
  };

  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowMenu({ menu: false, notification: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800">
      <div className="mx-auto px-2 sm:pe-6 lg:pe-8">
        <div className="relative flex h-11 items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="bg-indigo-200 p-1 rounded-sm text-indigo-800 text-2xl hover:bg-indigo-300 transition-all duration-300 ease cursor-pointer"
          >
            {collapsed ? left_panel_open : left_panel_close}
          </button>

          <div className="inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* 🔔 Notification */}
            <div className="relative" ref={notificationRef}>
              <button onClick={() => handleShowMenu("notification")}>
                <Bell />
              </button>

              <div
                className={`absolute border-slate-300 border bg-[white]/80 backdrop-blur-sm p-5 pe-2 right-0 top-[140%] rounded-lg min-w-[25rem] z-30 transition-all duration-200 ease-in ${
                  showMenu.notification
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none translate-y-2.5"
                }`}
              >
                <div className="flex flex-col gap-3 max-h-[50vh] min-h-[200px] overflow-y-auto pe-2">
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                  <NotificationItem />
                </div>
              </div>
            </div>

            {/* 👤 User Menu */}
            <div className="relative ml-4" ref={menuRef}>
              <div onClick={() => handleShowMenu("menu")}>
                {user?.name ? (
                  <h2 className="bg-indigo-50 w-[35px] h-[35px] rounded-full flex items-center justify-center text-indigo-500 font-bold">
                    {getInitials(user?.name)}
                  </h2>
                ) : (
                  <Image
                    width={100}
                    height={100}
                    className="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..."
                    alt=""
                  />
                )}
              </div>

              <div
                className={`absolute p-5 bg-[white]/80 border border-slate-300 backdrop-blur-sm shadow-md top-[120%] w-fit right-0 min-w-[16rem] rounded-lg transition-all duration-200 ease-in z-30 ${
                  showMenu.menu
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none translate-y-2.5"
                }`}
              >
                <div className="flex gap-3 items-center">
                  {user?.name ? (
                    <h2 className="bg-indigo-50 w-[35px] h-[35px] rounded-full flex items-center justify-center text-indigo-500 font-bold">
                      {getInitials(user?.name)}
                    </h2>
                  ) : (
                    <Image
                      width={140}
                      height={140}
                      className="size-12 rounded-full border border-indigo-600"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?..."
                      alt=""
                    />
                  )}

                  <div>
                    <h2 className="text-indigo-800 text-lg">
                      {user?.name ? user.name : "No User"}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {user?.email ? user.email : "No Email"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-3 mt-4 items-start border-t border-slate-200">
                  <Link
                    className="text-sm hover:text-indigo-500 transition-all duration-200 ease-in"
                    href="/dashboard/my-profile"
                  >
                    View Profile
                  </Link>
                  <Link
                    className="text-sm hover:text-indigo-500 transition-all duration-200 ease-in"
                    href="/"
                  >
                    Change Password
                  </Link>
                  <Link
                    className="text-sm hover:text-indigo-500 transition-all duration-200 ease-in"
                    href="/"
                  >
                    Go to website
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm cursor-pointer hover:text-indigo-500 transition-all duration-200 ease-in"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NotificationItem = () => {
  return (
    <div className="flex gap-4 items-center bg-indigo-50 px-3 py-2 rounded-lg">
      <h3 className="bg-yellow-200 border-4 text-sm border-yellow-100 w-[35px] rounded-full flex items-center justify-center text-yellow-500 font-bold">
        R
      </h3>
      <div>
        <h3 className="text-sm">New user created Naresh</h3>
        <p className="text-xs text-slate-600">12 July 2025 Friday 03:35PM</p>
      </div>
    </div>
  );
};

export default Header;
