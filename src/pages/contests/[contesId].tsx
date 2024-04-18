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

export default function SingleContestPage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const calculateTimeLeft = () => {
    const now: any = new Date();
    const target: any = new Date(1713447000000);
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

  useEffect(() => {
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);
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
            <Link
              href={"/contests/lists"}
              className="flex items-center gap-4 mb-10"
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66797 9H20.3346M1.66797 9L9.66797 17M1.66797 9L9.66797 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-heading dark:text-darkHeading font-bold text-xl">
                Contest List
              </p>
            </Link>
            <div className="mb-10">
              <img
                className="lg:w-[40%] mx-auto rounded-lg"
                src="/CoderVai Programming Contest.png"
                alt=""
              />
            </div>
            <div className=" rounded-lg    bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  relative z-30">
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
                        CoderVai presents <br /> CoderVai Programming Contest -
                        CVPC 1.0
                      </p>
                      <p className="my-4 text-lg text-darkHeading">
                        Sharpen your skills with basic programming challenges!
                      </p>
                      <p className="text-base text-darkHeading">
                        আপনার মত 480 জন শিক্ষার্থী এই প্রতিযোগিতায় অংশগ্রহণ
                        করছে!
                      </p>
                      <div className="flex justify-between items-center lg:mt-3 flex-col-reverse my-6 lg:mb-0 lg:flex-row">
                        <div>
                          <Link
                            href="https://vjudge.net/contest/623126"
                            className="bg-[#EB9E11] px-6 py-3 mt-4 text-white rounded-lg font-semibold block hover:opacity-70 ease-in-out duration-150"
                          >
                            রেজাল্ট দেখ
                          </Link>
                        </div>
                        <div className="mr-4">
                          <div className="flex justify-between text-base">
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
                              <p className="mt-1">ঘন্টা</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                {minutes.toString().padStart(2, "0")}
                              </p>
                              <p className="mt-1">মিনিট</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-white bg-gray-300/5 py-2 px-4 rounded-lg font-bold text-2xl">
                                {seconds.toString().padStart(2, "0")}
                              </p>
                              <p className="mt-1">সেকেন্ড </p>
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
              <div></div>
              <div className="mt-20">
                {/* <p className="text-heading dark:text-darkHeading text-center mt-3 ">
                  অন্যান্য অংশগ্রহণকারীদের সাথে প্রতিযোগিতা করুন এবং আপনার
                  দক্ষতা মূল্যায়ন করুন। আপনার মত 500 জন শিক্ষার্থী এই
                  প্রতিযোগিতায় অংশগ্রহণ করছে!{" "}
                </p> */}
                {/* <div className="flex flex-col lg:flex-row items-center gap-8 justify-evenly mt-8">
                    <div className="flex rounded-lg bg-gray-300/10 flex-col gap-4 items-center justify-center w-full px-20 py-[18px] border border-[#2BA98B]/50">
                      <svg
                        width="75"
                        height="65"
                        viewBox="0 0 75 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M40.8703 41.2062H34.1334V24.3641H40.8703M40.8703 54.6799H34.1334V47.9431H40.8703M0.449219 64.7852H74.5545L37.5019 0.785156L0.449219 64.7852Z"
                          fill="#139D7B"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3024_7834"
                            x1="39.8988"
                            y1="0.785156"
                            x2="34.4274"
                            y2="51.0531"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#00FFC2" stop-opacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p className="text-heading dark:text-darkHeading">
                        ১০টি প্রবলেম
                      </p>
                    </div>
                    <div className="flex rounded-lg bg-gray-300/10 flex-col gap-4 items-center justify-center w-full px-20 py-6 border border-[#2BA98B]/50">
                      <svg
                        width="55"
                        height="54"
                        viewBox="0 0 55 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M27.4987 0.119141C42.2267 0.119141 54.1654 12.0578 54.1654 26.7858C54.1654 41.5138 42.2267 53.4525 27.4987 53.4525C12.7707 53.4525 0.832031 41.5138 0.832031 26.7858C0.832031 12.0578 12.7707 0.119141 27.4987 0.119141ZM27.4987 10.7858C26.7915 10.7858 26.1132 11.0668 25.6131 11.5669C25.113 12.067 24.832 12.7452 24.832 13.4525V26.7858C24.8322 27.493 25.1132 28.1712 25.6134 28.6711L33.6134 36.6711C34.1163 37.1569 34.7899 37.4257 35.4891 37.4196C36.1883 37.4135 36.8571 37.1331 37.3515 36.6387C37.846 36.1442 38.1264 35.4754 38.1325 34.7762C38.1386 34.077 37.8698 33.4034 37.384 32.9005L30.1654 25.6818V13.4525C30.1654 12.7452 29.8844 12.067 29.3843 11.5669C28.8842 11.0668 28.2059 10.7858 27.4987 10.7858Z"
                          fill="#139D7B"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3024_7839"
                            x1="29.2238"
                            y1="0.119141"
                            x2="23.9654"
                            y2="41.8427"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#00FFC2" stop-opacity="0.5" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <p className="text-heading dark:text-darkHeading">
                        ৩ ঘন্টা
                      </p>
                    </div>
                    <div className="flex rounded-lg bg-gray-300/10 flex-col gap-4 items-center justify-center w-full px-20 py-6 border border-[#2BA98B]/50">
                      <svg
                        width="53"
                        height="54"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 45.3352C0 49.8402 3.445 53.2852 7.95 53.2852H45.05C49.555 53.2852 53 49.8402 53 45.3352V24.1352H0V45.3352ZM45.05 5.58516H39.75V2.93516C39.75 1.34516 38.69 0.285156 37.1 0.285156C35.51 0.285156 34.45 1.34516 34.45 2.93516V5.58516H18.55V2.93516C18.55 1.34516 17.49 0.285156 15.9 0.285156C14.31 0.285156 13.25 1.34516 13.25 2.93516V5.58516H7.95C3.445 5.58516 0 9.03016 0 13.5352V18.8352H53V13.5352C53 9.03016 49.555 5.58516 45.05 5.58516Z"
                          fill="#139D7B"
                        />
                      </svg>

                      <p className="text-heading dark:text-darkHeading">
                        রাত ৮টা, ২৫ নভেম্বর
                      </p>
                    </div>
                  </div> */}

                <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                  প্রতিযোগিতার বিবরণ
                </p>
                <div className="mt-8  grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-3 ">
                  <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5 ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.48438 8.00171H7.5167L8.50108 5.67524L9.48438 8.00171ZM0 2.75C0 1.23122 1.23122 0 2.75 0H19.25C20.7688 0 22 1.23122 22 2.75V11.5372C20.7381 10.5728 19.161 10 17.4502 10C14.9973 10 12.8195 11.1775 11.4511 12.9981L4.2251 12.9981C3.81088 12.9981 3.4751 13.3339 3.4751 13.7481C3.4751 14.1623 3.81089 14.4981 4.2251 14.4981L10.5751 14.4981C10.1732 15.4173 9.9502 16.4326 9.9502 17.5C9.9502 19.1884 10.5081 20.7465 11.4496 22H2.75C1.23122 22 0 20.7688 0 19.25V2.75ZM9.19229 3.45768C9.07498 3.18012 8.80294 2.99972 8.50161 2.99966C8.20028 2.99961 7.92817 3.1799 7.81075 3.45741L5.05924 9.96029C4.89783 10.3418 5.07622 10.7819 5.45769 10.9433C5.83916 11.1047 6.27926 10.9263 6.44066 10.5448L6.88202 9.50171H10.1184L10.5591 10.5445C10.7204 10.9261 11.1604 11.1046 11.5419 10.9434C11.9235 10.7821 12.102 10.3421 11.9408 9.96057L9.19229 3.45768ZM3.4751 17.7511C3.4751 18.1653 3.81088 18.5011 4.22509 18.5011L8.7505 18.5012C9.16471 18.5012 9.5005 18.1654 9.5005 17.7512C9.5005 17.3369 9.16472 17.0012 8.75051 17.0012L4.2251 17.0011C3.81089 17.0011 3.4751 17.3369 3.4751 17.7511ZM15.5 3.74991C15.5 3.3357 15.1642 2.99991 14.75 2.99991C14.3358 2.99991 14 3.3357 14 3.74991V5H12.7523C12.3381 5 12.0023 5.33579 12.0023 5.75C12.0023 6.16421 12.3381 6.5 12.7523 6.5H14V7.7476C14 8.16181 14.3358 8.4976 14.75 8.4976C15.1642 8.4976 15.5 8.16181 15.5 7.7476V6.5H16.75C17.1642 6.5 17.5 6.16421 17.5 5.75C17.5 5.33579 17.1642 5 16.75 5H15.5V3.74991ZM23.9502 17.5C23.9502 21.0899 21.04 24 17.4502 24C13.8603 24 10.9502 21.0899 10.9502 17.5C10.9502 13.9101 13.8603 11 17.4502 11C21.04 11 23.9502 13.9101 23.9502 17.5ZM17.9502 13.5C17.9502 13.2239 17.7263 13 17.4502 13C17.1741 13 16.9502 13.2239 16.9502 13.5V17H13.4502C13.1741 17 12.9502 17.2239 12.9502 17.5C12.9502 17.7761 13.1741 18 13.4502 18H16.9502V21.5C16.9502 21.7761 17.1741 22 17.4502 22C17.7263 22 17.9502 21.7761 17.9502 21.5V18H21.4502C21.7263 18 21.9502 17.7761 21.9502 17.5C21.9502 17.2239 21.7263 17 21.4502 17H17.9502V13.5Z"
                        fill="#D95344"
                      />
                    </svg>
                    <div>
                      <p className="text-paragraph dark:text-darkParagraph text-xl">
                        সমস্যার সংখ্যা
                      </p>
                      <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                        7 টি
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5 ">
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 0.5C1.95507 0.5 0.5 1.95508 0.5 3.75V14.25C0.5 16.0449 1.95507 17.5 3.75 17.5H13.25C15.0449 17.5 16.5 16.0449 16.5 14.25V3.75C16.5 1.95507 15.0449 0.5 13.25 0.5H3.75ZM21.6232 15.6431L18 12.0935V5.99889L21.6121 2.3706C22.3988 1.58044 23.748 2.13753 23.748 3.25251V14.7502C23.748 15.8577 22.4143 16.4181 21.6232 15.6431Z"
                        fill="#B2F100"
                      />
                    </svg>

                    <div>
                      <p className="text-paragraph dark:text-darkParagraph text-xl">
                        সময়কাল
                      </p>
                      <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                        3 ঘণ্টা
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5 ">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.25 11.5H9.25C8.836 11.5 8.5 11.164 8.5 10.75V4.75C8.5 4.336 8.836 4 9.25 4C9.664 4 10 4.336 10 4.75V10H13.25C13.664 10 14 10.336 14 10.75C14 11.164 13.664 11.5 13.25 11.5ZM10 0C4.478 0 0 4.478 0 10C0 15.522 4.478 20 10 20C15.522 20 20 15.522 20 10C20 4.478 15.522 0 10 0Z"
                        fill="#2BA98B"
                      />
                    </svg>

                    <div>
                      <p className="text-paragraph dark:text-darkParagraph text-xl">
                        শেষ সময়সীমা
                      </p>
                      <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                        রাত ১০.৩০ টা, ১৮ এপ্রিল
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 p-4 rounded-xl bg-black/20 dark:bg-white/5 ">
                    <svg
                      width="22"
                      height="24"
                      viewBox="0 0 22 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.5 2.75C4.5 1.23122 5.73122 0 7.25 0H15.25C16.7688 0 18 1.23122 18 2.75V3H20.25C21.2165 3 22 3.7835 22 4.75V7.75C22 10.0902 20.1085 11.9887 17.771 11.9999C17.0627 14.6458 14.7871 16.6507 12 16.9588V19H14.75C16.5449 19 18 20.4551 18 22.25V22.75C18 23.4404 17.4404 24 16.75 24H5.75C5.05964 24 4.5 23.4404 4.5 22.75V22.25C4.5 20.4551 5.95507 19 7.75 19H10.5V16.9588C7.71294 16.6507 5.43729 14.6458 4.72905 11.9999C2.39148 11.9887 0.5 10.0902 0.5 7.75V4.75C0.5 3.7835 1.2835 3 2.25 3H4.5V2.75ZM4.5 4.5H2.25C2.11193 4.5 2 4.61193 2 4.75V7.75C2 9.18593 3.10055 10.3648 4.50416 10.4892C4.50139 10.4098 4.5 10.3301 4.5 10.25V4.5ZM17.9958 10.4892C19.3995 10.3648 20.5 9.18593 20.5 7.75V4.75C20.5 4.61193 20.3881 4.5 20.25 4.5H18V10.25C18 10.3301 17.9986 10.4098 17.9958 10.4892Z"
                        fill="#FFA500"
                      />
                    </svg>

                    <div>
                      <p className="text-paragraph dark:text-darkParagraph text-xl">
                        প্রতিযোগিতার পুরস্কার
                      </p>
                      <p className="text-heading dark:text-darkHeading font-bold text-2xl mt-1">
                        40 হাজার টাকা
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-center">
                  <a className="flex gap-2 cursor-pointer rounded-lg justify-center items-center px-6 py-1 mt-10 border border-gray-300/30 bg-gray-300/10 hover:opacity-70 ease-in-out duration-150">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 10.3105C20 4.79055 15.52 0.310547 10 0.310547C4.48 0.310547 0 4.79055 0 10.3105C0 15.1505 3.44 19.1805 8 20.1105V13.3105H6V10.3105H8V7.81055C8 5.88055 9.57 4.31055 11.5 4.31055H14V7.31055H12C11.45 7.31055 11 7.76055 11 8.31055V10.3105H14V13.3105H11V20.2605C16.05 19.7605 20 15.5005 20 10.3105Z"
                        className="fill-black dark:fill-white"
                      />
                    </svg>
                    <p className="text-heading dark:text-darkHeading font-bold text-lg">
                      Join Our Facebook Group For More Info
                    </p>
                  </a>
                </div> */}
                <div className="mt-10 ">
                  <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                    প্রতিযোগিতার নিয়ম
                  </p>
                  <div className="mt-3">
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading`}
                        >
                          1
                        </p>
                      </div>
                      <p className="text-lg">VJudge এ একাউন্ট থাকতে হবে।</p>
                    </div>
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading`}
                        >
                          2
                        </p>
                      </div>
                      <p className="text-lg">
                        কন্টেস্ট লিঙ্কে যেতে হবে এবং Password দিতে হবে। Password
                        দিলেই কন্টেস্ট ওপেন হবে।
                      </p>
                    </div>
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading`}
                        >
                          3
                        </p>
                      </div>
                      <p className="text-lg">
                        VJudge এ Codeforces এর মতই Problem submit দেয়া যাবে।
                      </p>
                    </div>
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading `}
                        >
                          4
                        </p>
                      </div>
                      <p className="text-lg">
                        কনটেস্ট এ ৮-১০ টি প্রভলেম থাকবে এবং সময় থাকবে ৩ ঘণ্টা
                      </p>
                    </div>
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading `}
                        >
                          5
                        </p>
                      </div>
                      <p className="text-lg">
                        যেকোনো ল্যাঙ্গুয়েজ ব্যবহার করা যাবে
                      </p>
                    </div>
                    <div className="flex my-2 items-center gap-2 text-base text-paragraph dark:text-darkParagraph">
                      <div
                        className={`px-2 py-2 rounded-full bg-[#2BA98B]/[.14]  `}
                      >
                        <p
                          className={`px-3 py-[2px] rounded-full  font-bold text-xl bg-[#03614A]/[1] text-darkHeading `}
                        >
                          6
                        </p>
                      </div>
                      <p className="text-lg">
                        কোনো প্লাগারিজম এর প্রমাণ মিললে তাঁকে কনটেস্ট থেকে
                        ডিসকুয়েলিফাই করা হবে।
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-10">
                  <p className="mt-8 text-3xl font-bold text-heading dark:text-darkHeading">
                    FAQ
                  </p>
                  <div className="bg-white/[.1] rounded-lg p-5 mt-6">
                    <p className="text-heading dark:text-darkHeading text-lg font-bold">
                      আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                    </p>

                    <p className="text-paragraph dark:text-darkParagraph text-lg mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                  </div>
                  <div className="bg-white/[.1] rounded-lg p-5 mt-6">
                    <p className="text-heading dark:text-darkHeading text-lg font-bold">
                      আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                    </p>

                    <p className="text-paragraph dark:text-darkParagraph text-lg mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                  </div>
                  <div className="bg-white/[.1] rounded-lg p-5 mt-6">
                    <p className="text-heading dark:text-darkHeading text-lg font-bold">
                      আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                    </p>

                    <p className="text-paragraph dark:text-darkParagraph text-lg mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                  </div>
                  <div className="bg-white/[.1] rounded-lg p-5 mt-6">
                    <p className="text-heading dark:text-darkHeading text-lg font-bold">
                      আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                    </p>

                    <p className="text-paragraph dark:text-darkParagraph text-lg mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
