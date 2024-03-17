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
  const [numberOfSkills, setnumberOfSkills] = useState<any>(1);
  return (
    <ProfileLayout>
      <div className="rounded-xl w-full flex-[3]  py-16 px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
        <div className="w-full md:w-[80%] mx-auto flex-col ">
          <div>
            <p className="text-heading dark:text-darkHeading text-2xl font-bold">
              My Skillset
            </p>
            <p className="mt-1 text-paragraph dark:text-darkParagraph">
              Enter your skillsets here
            </p>
          </div>
          <div className="lg:mt-10">
            {Array.from({ length: numberOfSkills }).map((__, index) => (
              <div
                key={Math.random()}
                className="py-10 border-b border-gray-300/20 lg:p-0 lg:border-none lg:mb-6 grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-12 "
              >
                <div className="">
                  <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                    Skill Name
                  </p>
                  <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
                </div>
                <div className="">
                  <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                    Experience in year
                  </p>
                  <input
                    type="number"
                    className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg"
                  />
                </div>
              </div>
            ))}

            <div
              className="mt-4 flex items-center gap-2 text-[#1CAB55] cursor-pointer hover:opacity-50"
              onClick={() => {
                setnumberOfSkills((prev: any) => prev + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-[16px] fill-[#1CAB55]"
                id="plus"
              >
                <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path>
              </svg>
              <p>Add new skill</p>
            </div>
          </div>
          <div className="mt-5 ">
            <button className=" flex justify-center text-darkHeading items-center bg-[#1CAB55] py-3 w-full mt-8 rounded-xl hover:bg-opacity-50 ease-in-out duration-150">
              Save
            </button>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
