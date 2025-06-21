"use client";

import { cross_icon, menu_icon } from "@/assets/icons/website";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import avatar from "@/assets/images/user-avatar.png";

const Navbar = () => {
  const [navVisible, setNavVisible] = useState<boolean>(false);
  const links = [
    {
      text: "Equipment",
      url: "/",
    },
    {
      text: "Plans",
      url: "/",
    },
    {
      text: "Trainers",
      url: "/",
    },
    {
      text: "Testimonials",
      url: "/",
    },
    {
      text: "Dashboard",
      url: "/dashboard",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = navVisible ? 'hidden' : 'auto';
  }, [navVisible])
  
  return (
    <>
      {/* ${navVisible ? "rounded-tl-[40px] rounded-tr-[40px]" : "rounded-[40px]"} */}
      <nav
        className={`min-w-[95%] z-40 xl:min-w-[992px] max-w-[1140px] backdrop-blur-[20px] backdrop-saturate-150 backdrop-invert-[.1] border-1 border-indigo-100/30 bg-white/60 fixed p-4 md:w-[95%] left-[50%] translate-x-[-50%] items-center rounded-[31px] lg:rounded-[40px] flex justify-between mt-4 px-10`}
      >
        <h2 className="text-xl font-bolder text-indigo-800">Trainzo</h2>
        <menu className={`hidden lg:block`}>
          <ul className="flex gap-5 items-center">
            {links?.map((item, index) => (
              <li key={`navlink-${index}`}>
                <Link
                  className="transition-colors duration-300 ease-in-out text-white font-medium hover:text-indigo-600"
                  href={item.url}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </menu>
        <div className="hidden lg:flex gap-5 items-center">
          <Link
            className="border-1 p-2 py-1 rounded-4xl px-5 text-white border-orange-500 bg-orange-500"
            href={"#contact"}
          >
            Contact us
          </Link>
          <Link className="text-slate-100 font-medium" href={"/login"}>
            <div className="border-1 rounded-full border-gray-600">
              <Image
                className="w-8 rounded-full"
                src={avatar}
                alt="Avatar"
              ></Image>
            </div>
          </Link>
        </div>
        {!navVisible ? (
          <button className="lg:hidden" onClick={() => setNavVisible(true)}>
            {menu_icon}
          </button>
        ) : (
          <button className="lg:hidden" onClick={() => setNavVisible(false)}>
            {cross_icon}
          </button>
        )}
      </nav>

      <menu
        className={`bg-black/10 lg:hidden backdrop-blur-lg z-20 p-5 flex fixed pt-[8rem] h-[100vh] w-[100vw] left-0 top-0 transition-all duration-300 ease-in ${
          navVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`rounded-[30px] absolute p-8 bg-slate-800 w-[95%] overflow-hidden left-[50%] translate-x-[-50%] top-4 transition-all duration-300 ease-in ${
            navVisible ? " h-[450px] pt-[90px]" : "h-[0] pt-0"
          }`}
        >
          <ul className="flex flex-col gap-6">
            {links?.map((item, index) => (
              <li key={`navlink-${index}`}>
                <Link
                  className="transition-colors duration-300 ease-in-out text-white text-2xl font-medium hover:text-indigo-600"
                  href={item.url}
                >
                  {item.text}
                </Link>
              </li>
            ))}

            <li>
              <Link
                className="text-slate-100 text-2xl font-medium"
                href={"/login"}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </menu>
    </>
  );
};

export default Navbar;
