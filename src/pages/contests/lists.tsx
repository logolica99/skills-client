import React, { useContext, useEffect, useState } from "react";

type Props = {};

import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";
import Nav from "@/components/Nav";
import { HindSiliguri } from "@/helpers";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import FloatingCompiler from "@/components/FloatingCompiler";
import Footer from "@/components/Footer";
import ProfileLayout from "@/components/ProfileLayout";
function epochToDateString(epochTime: any) {
  // Create a Date object from the epoch timestamp in milliseconds
  const date = new Date(epochTime * 1000);

  // Format the date string with day and month name (short format)
  const dateString = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  // Extract the day and month components (can be customized if needed)
  const day = dateString.split(", ")[0];
  const month = dateString.split(", ")[1];

  // Return the formatted string "DD Month"
  return `${day} `;
}

function epochToTimeString(epochTime: any, useTimeZone = true) {
  const date = new Date(epochTime * 1000);

  // Format the time string with hours, minutes, and optional AM/PM indicator
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  let timeString = `${hours}:${minutes}`;

  // Handle 12-hour clock format with AM/PM indicator (if requested)
  if (useTimeZone) {
    const isAfternoon = hours >= 12;
    hours = isAfternoon ? (hours - 12) % 12 : hours % 12; // Convert to 12-hour format
    timeString = `${timeString} ${isAfternoon ? "PM" : "AM"}`;
  }

  return timeString;
}

export default function ProfilePage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTimeLeft = () => {
    const now: any = new Date();
    const target: any = new Date(1712669237204);
    const difference: any = target - now;

    // Handle negative difference (target date in the past)
    if (difference <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);

      return;
    }

    const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const remainingMinutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    setDays(remainingDays);
    setHours(remainingHours);
    setMinutes(remainingMinutes);
    setSeconds(remainingSeconds);
  };

  //   useEffect(() => {
  //     const intervalId = setInterval(calculateTimeLeft, 1000);

  //     return () => clearInterval(intervalId);
  //   }, []);
  return (
    <ProtectedRoute>
      <div
        className={`  ${HindSiliguri.variable} overflow-x-hidden   font-hind`}
      >
        <Nav></Nav>
        <Toaster />
        <FloatingCompiler />

        <button
          style={{ zIndex: 999 }}
          onClick={() => {
            setUser({ ...user, openCompiler: true });
          }}
          className="fixed -left-2 top-80 border border-gray-200/20  bg-[#0B060D] bg-opacity-30 p-3 backdrop-blur-lg hover:bg-gray-300/20 "
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M13.2942 7.17041L12.0001 12L10.706 16.8297"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M8.49994 9L8.32837 9.17157C6.99504 10.5049 6.32837 11.1716 6.32837 12C6.32837 12.8284 6.99504 13.4951 8.32837 14.8284L8.49994 15"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
              <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <div className="overflow-x-hidden bg-white py-16 dark:bg-[#000000]">
          <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 lgXl:w-[90%]">
            <div className=" rounded-lg  flex-[3]  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  relative z-30">
              <svg
                width="1447"
                height="969"
                viewBox="0 0 1447 969"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -left-[32rem] -top-16 hidden"
              >
                <g filter="url(#filter0_f_2064_21863)">
                  <ellipse
                    cx="737.327"
                    cy="328.913"
                    rx="239.469"
                    ry="134.819"
                    transform="rotate(-10.6934 737.327 328.913)"
                    fill="#107B61"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_2064_21863"
                    x="0.669922"
                    y="-310.856"
                    width="1473.31"
                    height="1279.54"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="250"
                      result="effect1_foregroundBlur_2064_21863"
                    />
                  </filter>
                </defs>
              </svg>

              <div
                className="rounded-xl h-full py-[.3px]  backdrop-blur-xl bg-opacity-50 "
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 165, 0, 0.62) 0%, rgba(255, 165, 0, 0) 100%)",
                }}
              >
                <div className=" rounded-xl px-4  my-[1px] bg-[#221d13] relative left-[1px]">
                  <div className="flex justify-between items-center flex-col-reverse gap-4 lg:flex-row">
                    <div className="lg:py-6 lg:pl-10">
                      <p className="text-white font-bold text-3xl">
                        কোডিং প্রতিযোগিতায় অংশগ্রহণ করুন{" "}
                        <br className="hidden lg:block" />
                        <span className="text-[#EB9E11]">
                          উপহার এবং গুডি পাওয়ার{" "}
                        </span>{" "}
                        সুযোগ জিতুন!
                      </p>
                      <p className="my-4 text-lg">
                        অন্যান্য অংশগ্রহণকারীদের সাথে প্রতিযোগিতা করুন এবং আপনার
                        দক্ষতা মূল্যায়ন করুন
                      </p>
                      <p className="text-sm">
                        আপনার মত 500 জন শিক্ষার্থী এই প্রতিযোগিতায় অংশগ্রহণ
                        করছে!{" "}
                      </p>
                      <div className="flex justify-between items-center lg:mt-3 flex-col-reverse my-6 lg:mb-0 lg:flex-row">
                        <div>
                          <Link
                            href=""
                            className="bg-[#EB9E11] px-6 py-3 mt-4 text-white rounded-lg font-semibold block hover:opacity-70 ease-in-out duration-150"
                          >
                            এখনি যোগদিন
                          </Link>
                        </div>
                        <div className="mr-4">
                          <div className="flex justify-between text-sm">
                            <p className="text-white">অবশিষ্ট সময়</p>
                            <div className="flex gap-2">
                              <svg
                                width="12"
                                height="15"
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.66536 1.5V6.16667H10.6654L5.33203 13.5V8.83333H1.33203L6.66536 1.5Z"
                                  stroke="url(#paint0_linear_4530_4930)"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_4530_4930"
                                    x1="5.9987"
                                    y1="1.5"
                                    x2="5.9987"
                                    y2="13.5"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#CF8E16" />
                                    <stop offset="1" stop-color="#FFE49C" />
                                  </linearGradient>
                                </defs>
                              </svg>

                              <p className="text-[#FDAF22]">তারাতারি কর</p>
                            </div>
                          </div>
                          <div className="flex gap-4 ">
                            <div className="flex flex-col items-center">
                              <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                {hours.toString().padStart(2, "0")}
                              </p>
                              <p className="mt-1">দিন</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                {minutes.toString().padStart(2, "0")}
                              </p>
                              <p className="mt-1">ঘন্টা</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                21
                              </p>
                              <p className="mt-1">মিনিট</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        src="/Frame 2147223443.png"
                        alt=""
                        className="h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-heading dark:text-darkHeading mt-10 text-2xl font-bold">
                Upcoming Contests
              </p>
              <Link
                href={`/contests/${10}`}
                className="mt-6 block hover:bg-gray-300/5 bg-gray-300/10  p-4 rounded-lg border border-[#2BA98B]/50"
                key={Math.random()}
              >
                <div className="flex flex-col lgXl:flex-row items-center gap-6">
                  <img
                    src={
                      "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg"
                    }
                    alt=""
                    className="w-[300px] rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      {/* <p className="text-paragraph dark:text-darkParagraph text-xl">
                          Muhidul Hasan
                        </p> */}
                    </div>
                    <h2 className=" text-2xl mt-3 mb-1 text-heading dark:text-darkHeading">
                      Coder Vai Programming Contest 03
                    </h2>
                    <p className="text-paragraph dark:text-darkParagraph ">
                      Technology enabled remote virtual bookkeeping for coders
                    </p>
                    <div className="flex gap-2 mt-2">
                      <p className="text-[#19745d] dark:text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                        C++
                      </p>
                      <p className="text-[#19745d] dark:text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/40 dark:bg-[#66F4D2]/10">
                        JAVA
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                      <div className="flex items-center ">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="4"
                     
                            fill-opacity="0.05"
                            className="fill-black dark:fill-[#EFF5F3]"
                          />
                          <path
                            d="M4 17.6C4 18.96 5.04 20 6.4 20H17.6C18.96 20 20 18.96 20 17.6V11.2H4V17.6ZM17.6 5.6H16V4.8C16 4.32 15.68 4 15.2 4C14.72 4 14.4 4.32 14.4 4.8V5.6H9.6V4.8C9.6 4.32 9.28 4 8.8 4C8.32 4 8 4.32 8 4.8V5.6H6.4C5.04 5.6 4 6.64 4 8V9.6H20V8C20 6.64 18.96 5.6 17.6 5.6Z"
                            className="fill-black dark:fill-white"
                            
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                          Starting in{" "}
                          {/* {convertUnixTimestampShort(liveClass.scheduled_at)}, */}
                          {epochToDateString(1678908000)}
                        </p>
                        <svg
                          className="ml-4"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0ZM6 2.4C5.84087 2.4 5.68826 2.46321 5.57574 2.57574C5.46321 2.68826 5.4 2.84087 5.4 3V6C5.40003 6.15912 5.46327 6.3117 5.5758 6.4242L7.3758 8.2242C7.48896 8.3335 7.64052 8.39397 7.79784 8.3926C7.95516 8.39124 8.10565 8.32814 8.21689 8.21689C8.32814 8.10565 8.39124 7.95516 8.3926 7.79784C8.39397 7.64052 8.3335 7.48896 8.2242 7.3758L6.6 5.7516V3C6.6 2.84087 6.53679 2.68826 6.42426 2.57574C6.31174 2.46321 6.15913 2.4 6 2.4Z"
                            className="fill-black dark:fill-white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                          {epochToTimeString(1678908000)}
                        </p>
                      </div>
                      <div>
                        <div>
                          <button
                            onClick={() => {
                              alert("gaerm");
                            }}
                            className="flex  items-center gap-4 border font-bold bg-[#2BA98B] border-gray-600 dark:border-gray-300/20  py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out"
                          >
                            <p className="text-heading dark:text-darkHeading ">
                              Register
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                href={`/contests/${10}`}
                className="mt-6 block hover:bg-gray-300/5 bg-gray-300/10  p-4 rounded-lg border border-[#2BA98B]/50"
                key={Math.random()}
              >
                <div className="flex flex-col lgXl:flex-row items-center gap-6">
                  <img
                    src={
                      "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg"
                    }
                    alt=""
                    className="w-[300px] rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      {/* <p className="text-paragraph dark:text-darkParagraph text-xl">
                          Muhidul Hasan
                        </p> */}
                    </div>
                    <h2 className="text-darkHeading text-2xl mt-3 mb-1">
                      Coder Vai Programming Contest 03
                    </h2>
                    <p className="text-darkParagraph ">
                      Technology enabled remote virtual bookkeeping for coders
                    </p>
                    <div className="flex gap-2 mt-2">
                      <p className="text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/10">
                        C++
                      </p>
                      <p className="text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/10">
                        JAVA
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                      <div className="flex items-center ">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="4"
                            fill="#EFF5F3"
                            fill-opacity="0.05"
                          />
                          <path
                            d="M4 17.6C4 18.96 5.04 20 6.4 20H17.6C18.96 20 20 18.96 20 17.6V11.2H4V17.6ZM17.6 5.6H16V4.8C16 4.32 15.68 4 15.2 4C14.72 4 14.4 4.32 14.4 4.8V5.6H9.6V4.8C9.6 4.32 9.28 4 8.8 4C8.32 4 8 4.32 8 4.8V5.6H6.4C5.04 5.6 4 6.64 4 8V9.6H20V8C20 6.64 18.96 5.6 17.6 5.6Z"
                            className="fill-white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                          Starting in{" "}
                          {/* {convertUnixTimestampShort(liveClass.scheduled_at)}, */}
                          {epochToDateString(1678908000)}
                        </p>
                        <svg
                          className="ml-4"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0ZM6 2.4C5.84087 2.4 5.68826 2.46321 5.57574 2.57574C5.46321 2.68826 5.4 2.84087 5.4 3V6C5.40003 6.15912 5.46327 6.3117 5.5758 6.4242L7.3758 8.2242C7.48896 8.3335 7.64052 8.39397 7.79784 8.3926C7.95516 8.39124 8.10565 8.32814 8.21689 8.21689C8.32814 8.10565 8.39124 7.95516 8.3926 7.79784C8.39397 7.64052 8.3335 7.48896 8.2242 7.3758L6.6 5.7516V3C6.6 2.84087 6.53679 2.68826 6.42426 2.57574C6.31174 2.46321 6.15913 2.4 6 2.4Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-paragraph dark:text-darkParagraph ml-2">
                          {epochToTimeString(1678908000)}
                        </p>
                      </div>
                      <div>
                        <div>
                          <button
                            onClick={() => {
                              alert("gaerm");
                            }}
                            className="flex  items-center gap-4 border font-bold bg-[#2BA98B] border-gray-600 dark:border-gray-300/20  py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out"
                          >
                            <p className="text-heading dark:text-darkHeading ">
                              Register
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
