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

export default function ProfilePage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  return (
    <ProfileLayout>
      <div className="rounded-xl w-full flex-[3] py-5 px-4  md:py-10 md:px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
        <div className="w-full  mx-auto flex-col ">
          <div>
            <p className="text-heading dark:text-darkHeading text-2xl font-bold">
              Upcoming Live Class
            </p>
          </div>
          <div className="mt-10">
            <div className="flex flex-col lgXl:flex-row items-center gap-6 p-4 md:p-6 rounded-lg bg-gray-400/20 dark:bg-gray-200/5">
              <img src="/Group 33514.png" alt="" />
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <p className="text-paragraph dark:text-darkParagraph text-xl">
                    Muhidul Hasan
                  </p>
                  <div className="flex">
                  <p className="text-[#1f493f] dark:text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">

                      Android Development শিখব এবার হাতে কলমে
                    </p>
                  </div>
                </div>
                <h2 className="text-heading dark:text-darkHeading text-2xl mt-3 mb-1">
                  Crash Course on Polity through Data Science
                </h2>
                <p className="text-paragraph dark:text-darkParagraph ">
                  বিষয়: আমি প্রায় এক বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন
                  লোক) জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি, বেশিরভাগই একটি
                  অভ্যন্তরীণ CRM সিস্টেমে, যদিও আমাদের কাছে থাকা একটি
                  গ্রাহক-মুখী পোর্টালে কিছু কাজও করছি। একটি ছোট-ইশ স্টার্টআপের
                  জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি (40 জন)...আমি প্রায় এক
                  বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন) জন্য UX/UI ডিজাইনার
                  হিসেবে কাজ করছি, বেশিরভাগই একটি অভ্যন্তরীণ উপর.
                </p>
                <div className="flex flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    
                
                  </div>
                  <div>
                    <button className="flex  items-center gap-4 bg-[#2BA98B] py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out">
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.343 0.99728C4.43595 1.10226 4.50969 1.22693 4.56 1.36415C4.61031 1.50138 4.6362 1.64847 4.6362 1.79702C4.6362 1.94557 4.61031 2.09266 4.56 2.22989C4.50969 2.36711 4.43595 2.49178 4.343 2.59676C2.84287 4.29325 2.00013 6.59401 2.00013 8.993C2.00013 11.392 2.84287 13.6928 4.343 15.3892C4.43848 15.4935 4.51465 15.6182 4.56704 15.7562C4.61943 15.8941 4.64701 16.0424 4.64816 16.1925C4.64932 16.3426 4.62402 16.4914 4.57376 16.6303C4.52349 16.7693 4.44926 16.8955 4.35539 17.0016C4.26153 17.1077 4.14991 17.1917 4.02705 17.2485C3.90419 17.3053 3.77254 17.3339 3.6398 17.3326C3.50706 17.3313 3.37588 17.3002 3.25391 17.2409C3.13194 17.1817 3.02163 17.0956 2.92941 16.9876C-0.976469 12.5723 -0.976469 5.41253 2.92941 0.99728C3.11688 0.785367 3.37112 0.666321 3.63621 0.666321C3.90129 0.666321 4.15553 0.785367 4.343 0.99728ZM17.0713 0.99728C20.9762 5.41366 20.9762 12.5723 17.0713 16.9876C16.8839 17.1997 16.6296 17.3189 16.3644 17.319C16.0992 17.3191 15.8448 17.2001 15.6572 16.9882C15.4697 16.7762 15.3642 16.4887 15.3641 16.1888C15.364 15.889 15.4693 15.6013 15.6567 15.3892C17.1569 13.6928 17.9996 11.392 17.9996 8.993C17.9996 6.59401 17.1569 4.29325 15.6567 2.59676C15.4692 2.38466 15.3638 2.09698 15.3638 1.79702C15.3638 1.49706 15.4692 1.20938 15.6567 0.99728C15.8443 0.785175 16.0988 0.666016 16.364 0.666016C16.6293 0.666016 16.8838 0.785175 17.0713 0.99728ZM7.30915 4.24598C7.49657 4.45796 7.60185 4.74542 7.60185 5.04516C7.60185 5.34489 7.49657 5.63236 7.30915 5.84434C6.94521 6.25581 6.65651 6.7443 6.45954 7.28194C6.26257 7.81957 6.1612 8.39581 6.1612 8.97774C6.1612 9.55968 6.26257 10.1359 6.45954 10.6735C6.65651 11.2112 6.94521 11.6997 7.30915 12.1111C7.40197 12.2162 7.47558 12.3408 7.52579 12.478C7.576 12.6152 7.60181 12.7622 7.60177 12.9107C7.60172 13.0592 7.57581 13.2062 7.52552 13.3434C7.47522 13.4805 7.40153 13.6051 7.30865 13.7101C7.21577 13.815 7.10551 13.8982 6.98418 13.955C6.86284 14.0118 6.73281 14.041 6.6015 14.0409C6.47019 14.0409 6.34017 14.0116 6.21888 13.9547C6.09758 13.8978 5.98737 13.8145 5.89456 13.7095C4.7847 12.4545 4.1612 10.7525 4.1612 8.97774C4.1612 7.203 4.7847 5.50094 5.89456 4.24598C5.9874 4.14088 6.09766 4.05751 6.21902 4.00062C6.34039 3.94374 6.47047 3.91446 6.60185 3.91446C6.73323 3.91446 6.86332 3.94374 6.98468 4.00062C7.10605 4.05751 7.2163 4.14088 7.30915 4.24598ZM14.2651 4.24598C15.375 5.50094 15.9985 7.203 15.9985 8.97774C15.9985 10.7525 15.375 12.4545 14.2651 13.7095C14.0766 13.9154 13.8241 14.0293 13.562 14.0268C13.2998 14.0242 13.0491 13.9053 12.8637 13.6957C12.6784 13.4861 12.5732 13.2026 12.571 12.9063C12.5687 12.6099 12.6695 12.3243 12.8516 12.1111C13.2155 11.6997 13.5042 11.2112 13.7012 10.6735C13.8981 10.1359 13.9995 9.55968 13.9995 8.97774C13.9995 8.39581 13.8981 7.81957 13.7012 7.28194C13.5042 6.7443 13.2155 6.25581 12.8516 5.84434C12.6695 5.63114 12.5687 5.34561 12.571 5.04923C12.5732 4.75285 12.6784 4.46933 12.8637 4.25975C13.0491 4.05017 13.2998 3.93129 13.562 3.92872C13.8241 3.92614 14.0766 4.04008 14.2651 4.24598ZM10.0804 7.37713C10.4781 7.37713 10.8595 7.55577 11.1407 7.87375C11.4219 8.19173 11.5799 8.623 11.5799 9.07269C11.5799 9.52238 11.4219 9.95366 11.1407 10.2716C10.8595 10.5896 10.4781 10.7683 10.0804 10.7683C9.68264 10.7683 9.30122 10.5896 9.02 10.2716C8.73877 9.95366 8.58078 9.52238 8.58078 9.07269C8.58078 8.623 8.73877 8.19173 9.02 7.87375C9.30122 7.55577 9.68264 7.37713 10.0804 7.37713Z"
                          fill="white"
                        />
                      </svg>
                      <p className="text-white font-bold ">Join Live Class</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-heading dark:text-darkHeading text-2xl font-bold">
              Next Classes
            </p>
          </div>
          <div className="mt-4">
            <div className="flex flex-col lgXl:flex-row items-center gap-6">
              <img src="/Group 33514.png" alt="" />
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <p className="text-paragraph dark:text-darkParagraph text-xl">
                    Muhidul Hasan
                  </p>
                  <div className="flex">
                  <p className="text-[#1f493f] dark:text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">

                      Android Development শিখব এবার হাতে কলমে
                    </p>
                  </div>
                </div>
                <h2 className="text-heading dark:text-darkHeading text-2xl mt-3 mb-1">
                  Crash Course on Polity through Data Science
                </h2>
                <p className="text-paragraph dark:text-darkParagraph ">
                  বিষয়: আমি প্রায় এক বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন
                  লোক) জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি, বেশিরভাগই একটি
                  অভ্যন্তরীণ CRM সিস্টেমে, যদিও আমাদের কাছে থাকা একটি
                  গ্রাহক-মুখী পোর্টালে কিছু কাজও করছি। একটি ছোট-ইশ স্টার্টআপের
                  জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি (40 জন)...আমি প্রায় এক
                  বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন) জন্য UX/UI ডিজাইনার
                  হিসেবে কাজ করছি, বেশিরভাগই একটি অভ্যন্তরীণ উপর.
                </p>
                <div className="flex flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
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
                        className="fill-black dark:fill-white"

                      />
                    </svg>
                    <p className="text-paragraph dark:text-darkParagraph">Starting on October 25 7:00pm - 7:30pm</p>
                  </div>
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-heading dark:text-darkHeading text-2xl font-bold">
            Past Live Classes
            </p>
          </div>
          <div className="mt-4">
            <div className="flex flex-col lgXl:flex-row items-center gap-6">
              <img src="/Group 33514.png" alt="" />
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <p className="text-paragraph dark:text-darkParagraph text-xl">
                    Muhidul Hasan
                  </p>
                  <div className="flex">
                  <p className="text-[#1f493f] dark:text-[#66F4D2]  text-sm px-2 py-[1px]   rounded-full bg-[#66F4D2]/60 dark:bg-[#66F4D2]/10">
                      Android Development শিখব এবার হাতে কলমে
                    </p>
                  </div>
                </div>
                <h2 className="text-heading dark:text-darkHeading text-2xl mt-3 mb-1">
                  Crash Course on Polity through Data Science
                </h2>
                <p className="text-paragraph dark:text-darkParagraph ">
                  বিষয়: আমি প্রায় এক বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন
                  লোক) জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি, বেশিরভাগই একটি
                  অভ্যন্তরীণ CRM সিস্টেমে, যদিও আমাদের কাছে থাকা একটি
                  গ্রাহক-মুখী পোর্টালে কিছু কাজও করছি। একটি ছোট-ইশ স্টার্টআপের
                  জন্য UX/UI ডিজাইনার হিসাবে কাজ করছি (40 জন)...আমি প্রায় এক
                  বছর ধরে একটি ছোট-ইশ স্টার্টআপের (40 জন) জন্য UX/UI ডিজাইনার
                  হিসেবে কাজ করছি, বেশিরভাগই একটি অভ্যন্তরীণ উপর.
                </p>
                <div className="flex flex-col gap-4 lgXl:flex-row lgXl:items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
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
                        className="fill-black dark:fill-white"
                      />
                    </svg>
                    <p className="text-paragraph dark:text-darkParagraph">Starting on October 25 7:00pm - 7:30pm</p>
                  </div>
                  <div>
                  <div>
                    <button className="flex  items-center gap-4 border border-gray-600 dark:border-gray-300/20  py-2 px-4 rounded hover:opacity-70 duration-150 ease-in-out">
                
                      <p className="text-heading dark:text-darkHeading ">Watch Recording</p>
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
