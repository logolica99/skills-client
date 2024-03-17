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
      <div className="rounded-xl flex-[3]  py-16 px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 w-full">
        <div className="flex flex-col items-center w-full">
          <p className="text-heading dark:text-darkHeading text-2xl font-bold">
            Profile
          </p>
          <p className="mt-2 text-paragraph dark:text-darkParagraph">
            Edit your profile and picture
          </p>
          <img
            src="/profile_image.png"
            alt=""
            className="w-[100px] h-[100px] object-cover rounded-full mt-5"
          />
          <div className="mt-10 w-full md:w-[70%] lg:w-[50%]">
            <div className="">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                First Name
              </p>
              <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
            </div>
            <div className="mt-4 ">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Last Name
              </p>
              <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
            </div>
            <div className="mt-4 ">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Email
              </p>
              <input
                type="mail"
                className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg"
              />
            </div>
            <div className="mt-4 ">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Phone No.
              </p>
              <input
                type="number"
                className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg"
              />
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
