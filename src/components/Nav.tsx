import React, { useState } from "react";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RxHamburgerMenu } from "react-icons/rx";
import { isLoggedIn, logout } from "@/helpers";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
type Props = {};

import dynamic from "next/dynamic";

const TestComponent = dynamic(() => import("./TestComponent"), {
  ssr: false,
});

export default function Nav({}: Props) {
  const [menuShow, setMenuShow] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [token, setToken] = useState("");
  const [isLogged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    if (isLoggedIn()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="font-hind">
      <div className="bg-gray-100 bg-opacity-5 backdrop-blur-lg fixed w-full text-heading/90 z-50 border-b border-gray-300/20">
        <div className="w-[90%] lg:w-[80%] mx-auto py-4">
          <div className="flex justify-between items-center ">
            <div className="flex gap-10 items-center">
              <Link href="/">
                <img src="/logo.png" alt="" className="w-20 md:w-28 mr-8 " />
              </Link>
              {/* <Link
                href=""
                className="hidden lg:block hover:text-white ease-in-out duration-150"
              >
               আমার কোর্স
              </Link> */}
              <Link
                href=""
                className=" hidden lg:block hover:text-white ease-in-out duration-150"
              >
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link
                href="/course-details/12"
                className="hidden lg:block hover:text-white ease-in-out duration-150"
              >
                কোস কন্টেন্ট
              </Link>
              {isLogged ? (
                <Link
                  href="/course/12"
                  className="hidden lg:block hover:text-white ease-in-out duration-150"
                >
                  আপনার প্রোগ্রেস
                </Link>
              ) : (
                <Link
                  href="/course/12"
                  className="hidden lg:block hover:text-white ease-in-out duration-150"
                >
                  ফ্রি ট্রায়াল
                </Link>
              )}
            </div>

            {isLogged ? (
              <div className="flex gap-8 md:gap-8 items-center">
                <DarkModeSwitch
                  sunColor="orange"
                  size={20}
                  checked={!darkMode}
                  onChange={() => {
                    setDarkMode(!darkMode);
                  }}
                />

                <p className=" hidden lg:block hover:text-white ease-in-out duration-150 text-sm md:text-base">
                  {" "}
                  {jwtDecode<any>(token).name}
                </p>
                <button
                  onClick={logout}
                  className="hidden lg:block md:px-8 px-4 py-2 rounded-lg bg-red-900 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-100 ease-in-out duration-150 text-sm md:text-base"
                >
                  Logout
                </button>
                <RxHamburgerMenu
                  onClick={() => setMenuShow(!menuShow)}
                  className="lg:hidden cursor-pointer"
                  size={22}
                  color="white"
                />
              </div>
            ) : (
              <div className="flex gap-8 md:gap-8 items-center">
                <DarkModeSwitch
                  sunColor="orange"
                  size={20}
                  checked={!darkMode}
                  onChange={() => {
                    setDarkMode(!darkMode);
                  }}
                />

                <Link
                  href="/auth/login"
                  className=" hidden lg:block hover:text-white ease-in-out duration-150 text-sm md:text-base"
                >
                  লগ ইন
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden lg:block md:px-8 px-4 py-2 rounded-lg bg-gray-900 bg-opacity-5 backdrop-blur-xl hover:text-white ease-in-out duration-150 text-sm md:text-base"
                >
                  শুরু করুন
                </Link>
                <RxHamburgerMenu
                  onClick={() => setMenuShow(!menuShow)}
                  className="lg:hidden cursor-pointer"
                  size={22}
                  color="white"
                />
              </div>
            )}
          </div>
        </div>
        {/* mobile menu */}
      </div>
      <div
        className={`bg-gray-200 bg-opacity-10 backdrop-blur-xl lg:hidden fixed w-full z-40 text-white top-[63px] md:top-[76px] border-b border-white/30 duration-150 ease-out ${
          menuShow ? "translate-y-0" : "-translate-y-[170%]"
        }`}
      >
        <div className="w-[90%] lg:w-[80%] mx-auto py-8 ">
          <div className="flex flex-col justify-between items-center ">
            <div className="flex flex-col gap-10 items-center">
              {/* <Link
                href=""
                className="  hover:text-white ease-in-out duration-150"
              >
                নোটিফিকেশান
              </Link> */}
              <Link
                href=""
                className="  hover:text-white ease-in-out duration-150"
              >
                লাইফ ক্লাস শিডিউল
              </Link>
              <Link
                href="/course-details/12"
                className=" hover:text-white ease-in-out duration-150"
              >
                কোস কন্টেন্ট
              </Link>
            </div>

            {!isLogged ? (
              <div className="flex flex-col gap-8 items-center mt-8">
                <Link
                  href="/auth/login"
                  className="  hover:text-white ease-in-out duration-150 text-sm md:text-base"
                >
                  লগ ইন
                </Link>
                <Link
                  href="/auth/register"
                  className=" md:px-8 px-4 py-2 rounded-lg bg-white bg-opacity-30 backdrop-blur-xl hover:text-white ease-in-out duration-150 text-sm md:text-base"
                >
                  শুরু করুন
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-8 items-center mt-8">
                <p className="  hover:text-white ease-in-out duration-150 text-sm md:text-base">
                  {jwtDecode<any>(token).name}
                </p>
                <button
                  onClick={logout}
                  className=" md:px-8 px-4 py-2 rounded-lg bg-red-900 bg-opacity-90 backdrop-blur-xl hover:text-white ease-in-out duration-150 text-sm md:text-base"
                >
                  Logout
                </button>
              </div>
            )}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
