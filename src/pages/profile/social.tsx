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
              Social Links
            </p>
            <p className="mt-1 text-paragraph dark:text-darkParagraph">
              Add your social links here. So we can send you future
              <br /> update and exciting deals
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <svg
                className="w-[40px] h-[40px] bg-white rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="github"
              >
                <path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path>
              </svg>
              <input
                placeholder="Github Username"
                className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-1 text-lg rounded-lg"
              />
            </div>
            <div className="flex items-center gap-4">
              <svg
                className="w-[40px] h-[40px] "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="code-forces"
              >
                <path
                  fill="#F44336"
                  d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z"
                ></path>
                <path
                  fill="#2196F3"
                  d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z"
                ></path>
                <path
                  fill="#FFC107"
                  d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z"
                ></path>
              </svg>
              <input
                placeholder="Codeforces Username"
                className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-1 text-lg rounded-lg"
              />
            </div>
            <div className="flex items-center gap-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="url(#paint0_linear_1466_1537)"
                />
                <path
                  d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1466_1537"
                    x1="16"
                    y1="2"
                    x2="16"
                    y2="29.917"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#18ACFE" />
                    <stop offset="1" stop-color="#0163E0" />
                  </linearGradient>
                </defs>
              </svg>
              <input
                placeholder="Facebook Link"
                className="w-full bg-white/0 border border-gray-500 dark:border-gray-200/20 outline-none text-heading dark:text-darkHeading px-4 py-1 text-lg rounded-lg"
              />
            </div>
            <div className="mt-4 ">
              <button className=" flex justify-center text-darkHeading items-center bg-[#1CAB55] py-3 w-full rounded-xl hover:bg-opacity-50 ease-in-out duration-150">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
