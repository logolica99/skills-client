import React, { useState } from "react";
import Link from "next/link";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { RxHamburgerMenu } from "react-icons/rx";
import { isLoggedIn, logout } from "@/helpers";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
type Props = {};

import dynamic from "next/dynamic";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";

const TestComponent = dynamic(() => import("./TestComponent"), {
  ssr: false,
});

export default function Nav({}: Props) {
  const [menuShow, setMenuShow] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [token, setToken] = useState("");
  const [isLogged, setIsLoggedIn] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    if (isLoggedIn()) {
      setIsLoggedIn(true);
      fetchScore();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchScore = () => {
    const token = localStorage.getItem("token");
    axios
      .get(BACKEND_URL + "/user/course/getScore/" + COURSE_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setScore(res.data.data.score);
      })
      .catch((err) => {});
  };

  return (
    <div className="font-hind">
      <div className="bg-gray-100 bg-opacity-5 backdrop-blur-lg fixed w-full text-heading/90 z-50 border-b border-gray-300/20">
        <div className="w-[90%] lg:w-[80%] mx-auto py-4">
          <div className="flex justify-between items-center ">
            <div className="flex gap-10 items-center">
              <Link href="/">
                <img src="/logo.jpg" alt="" className="w-20 md:w-28 mr-8 " />
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
                <div className="hidden lg:flex items-center gap-3 bg-white px-3 py-1 rounded bg-opacity-25">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z"
                      fill="#fff"
                    />
                  </svg>
                  <p className="text-xl font-semibold ">{score}</p>
                </div>
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
                <div className="flex items-center gap-3 bg-white px-3 py-1 rounded bg-opacity-25">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.8382 11.1263L21.609 13.5616C21.2313 17.5742 21.0425 19.5805 19.8599 20.7902C18.6773 22 16.9048 22 13.3599 22H10.6401C7.09517 22 5.32271 22 4.14009 20.7902C2.95748 19.5805 2.76865 17.5742 2.391 13.5616L2.16181 11.1263C1.9818 9.2137 1.8918 8.25739 2.21899 7.86207C2.39598 7.64823 2.63666 7.5172 2.89399 7.4946C3.36968 7.45282 3.96708 8.1329 5.16187 9.49307C5.77977 10.1965 6.08872 10.5482 6.43337 10.6027C6.62434 10.6328 6.81892 10.6018 6.99526 10.5131C7.31351 10.3529 7.5257 9.91812 7.95007 9.04852L10.1869 4.46486C10.9888 2.82162 11.3898 2 12 2C12.6102 2 13.0112 2.82162 13.8131 4.46485L16.0499 9.04851C16.4743 9.91812 16.6865 10.3529 17.0047 10.5131C17.1811 10.6018 17.3757 10.6328 17.5666 10.6027C17.9113 10.5482 18.2202 10.1965 18.8381 9.49307C20.0329 8.1329 20.6303 7.45282 21.106 7.4946C21.3633 7.5172 21.604 7.64823 21.781 7.86207C22.1082 8.25739 22.0182 9.2137 21.8382 11.1263ZM12.9524 12.699L12.8541 12.5227C12.4741 11.841 12.2841 11.5002 12 11.5002C11.7159 11.5002 11.5259 11.841 11.1459 12.5227L11.0476 12.699C10.9397 12.8927 10.8857 12.9896 10.8015 13.0535C10.7173 13.1174 10.6125 13.1411 10.4028 13.1886L10.2119 13.2318C9.47396 13.3987 9.10501 13.4822 9.01723 13.7645C8.92945 14.0468 9.18097 14.3409 9.68403 14.9291L9.81418 15.0813C9.95713 15.2485 10.0286 15.3321 10.0608 15.4355C10.0929 15.5389 10.0821 15.6504 10.0605 15.8734L10.0408 16.0765C9.96476 16.8613 9.92674 17.2538 10.1565 17.4282C10.3864 17.6027 10.7318 17.4436 11.4227 17.1255L11.6014 17.0432C11.7978 16.9528 11.8959 16.9076 12 16.9076C12.1041 16.9076 12.2022 16.9528 12.3986 17.0432L12.5773 17.1255C13.2682 17.4436 13.6136 17.6027 13.8435 17.4282C14.0733 17.2538 14.0352 16.8613 13.9592 16.0765L13.9395 15.8734C13.9179 15.6504 13.9071 15.5389 13.9392 15.4355C13.9714 15.3321 14.0429 15.2485 14.1858 15.0813L14.316 14.9291C14.819 14.3409 15.0706 14.0468 14.9828 13.7645C14.895 13.4822 14.526 13.3987 13.7881 13.2318L13.5972 13.1886C13.3875 13.1411 13.2827 13.1174 13.1985 13.0535C13.1143 12.9896 13.0603 12.8927 12.9524 12.699Z"
                      fill="#fff"
                    />
                  </svg>
                  <p className="text-xl font-semibold ">{score}</p>
                </div>
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
