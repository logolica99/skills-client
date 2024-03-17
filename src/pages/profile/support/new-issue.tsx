import React, { useContext, useEffect, useState } from "react";

type Props = {};

import { Toaster, toast } from "react-hot-toast";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { BACKEND_URL, COURSE_ID } from "@/api.config";

import ProfileLayout from "@/components/ProfileLayout";
import Link from "next/link";

export default function ProfilePage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [numberOfSkills, setnumberOfSkills] = useState<any>(1);
  return (
    <ProfileLayout>
      <div className="rounded-xl w-full flex-[3]  py-16 px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
        <div className=" flex flex-col lg:flex-row gap-4 lg:gap-20 ">
          <Link href="/profile/support/issues">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66602 9H20.3327M1.66602 9L9.66602 17M1.66602 9L9.66602 1"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <div className="">
            <div>
              <p className="text-heading dark:text-darkHeading text-2xl font-bold">
                Create a new issue
              </p>
              <p className="mt-1 text-paragraph dark:text-darkParagraph">
                Send a report to our support center & we will come back to you
                as soon as we can
              </p>
            </div>
            <div className="mt-8">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Subject
              </p>
              <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
            </div>
            <div className="mt-4">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Description
              </p>
              <textarea className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
            </div>
            <div className="mt-4">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Attachments
              </p>
              <div className="flex cursor-pointer flex-col gap-2 py-4 justify-center items-center border border-[#57A68F] rounded-lg">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.16602 13.3333L10.4993 10M10.4993 10L13.8327 13.3333M10.4993 10V17.5M17.166 13.9524C18.1839 13.1117 18.8327 11.8399 18.8327 10.4167C18.8327 7.88536 16.7807 5.83333 14.2493 5.83333C14.0673 5.83333 13.8969 5.73833 13.8044 5.58145C12.7177 3.73736 10.7114 2.5 8.41602 2.5C4.96424 2.5 2.16602 5.29822 2.16602 8.75C2.16602 10.4718 2.86222 12.0309 3.98847 13.1613"
                    stroke="#2BA98B"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className="text-heading dark:text-darkHeading font-semibold">
                  Click to upload{" "}
                  <span className="text-heading/20 dark:text-darkHeading/30 font-thin">
                    or drag and drop
                  </span>
                </p>
              </div>
              <p className="text-paragraph dark:text-darkParagraph mt-2">
                Please enter the details of your request. A member of our
                support staff will respond as soon as possible
              </p>
            </div>
            <div className="flex items-center my-3 gap-3 text-paragraph dark:text-darkParagraph">
              <input type="checkbox" name="" id="" />{" "}
              <p> I understand support is disabled in weekends </p>
            </div>
            <div className="mt-5 ">
              <button className=" flex justify-center text-darkHeading items-center bg-[#1CAB55] py-3 w-full mt-8 rounded-xl hover:bg-opacity-50 ease-in-out duration-150">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
