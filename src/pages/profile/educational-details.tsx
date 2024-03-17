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
      <div className="rounded-xl w-full flex-[3]  py-16 px-8  bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
        <div className="w-full md:w-[80%] mx-auto flex-col ">
          <div>
            <p className="text-heading dark:text-darkHeading text-2xl font-bold">
              Education Details
            </p>
            <p className="mt-1 text-paragraph dark:text-darkParagraph">
              Add your Educational Details here.
            </p>
          </div>
          <div className="mt-10 grid gap-y-5">
            <div className="">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Select Your Educational Level
              </p>
              <select
                className="select select-bordered w-full bg-gray-200/20 border-gray-500 dark:border-gray-200/20 text-black dark:text-white"
                required
              >
                <option className=" dark:bg-black" defaultChecked disabled>
                  Select an option
                </option>
                <option className=" dark:bg-black" value="SSC">
                  SSC
                </option>
                <option className=" dark:bg-black" value="HSC">
                  HSC
                </option>
                <option className=" dark:bg-black" value="UNIVERSITY">
                  University
                </option>
                <option className=" dark:bg-black" value="OTHERS">
                  OTHERS
                </option>
              </select>
            </div>

            <div className="">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Current Institution
              </p>
              <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
            </div>
            <div className="">
              <p className="text-paragraph dark:text-darkParagraph mb-1 font-xl">
                Approximate Passing Year
              </p>
              <input className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-2 text-xl rounded-lg" />
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
