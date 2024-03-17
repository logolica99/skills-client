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
        <div className="w-full md:w-[90%] mx-auto flex-col ">
          <div className="flex justify-between items-center ">
            <p className="text-2xl font-bold text-heading dark:text-darkHeading">
              My Issues
            </p>
            <Link
              href="/profile/support/new-issue"
              className="flex items-center gap-3
             rounded-lg font-semibold bg-gray-400/20 backdrop-blur-lg
              dark:bg-gray-200/5  py-2 px-8 border border-[#2BA98B]
               hover:border-gray-300 text-heading dark:text-darkHeading"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15M1 8H15"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Create New issue
            </Link>
          </div>

          <div className="my-8">
            <div
              className={
                "text-heading dark:text-darkHeading collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mb-6"
              }
              key={Math.random()}
            >
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title  font-medium ">
                <div className="flex gap-8 items-center">
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5845 1.41408C15.6019 0.325165 13.9074 0.281734 12.8702 1.31887L0.801353 13.3873C-0.227062 14.4157 -0.194416 16.0929 0.87324 17.0805L2.24843 18.3525C2.96234 19.0129 3.9403 18.8652 4.53865 18.622C4.73122 18.5437 4.94244 18.5002 5.16569 18.5002C6.08617 18.5002 6.83236 19.2464 6.83236 20.1669C6.83236 20.3442 6.80494 20.5136 6.75465 20.672C6.55939 21.287 6.48778 22.2739 7.20193 22.9345L8.2216 23.8777C9.22545 24.8063 10.7815 24.783 11.7572 23.8248L23.2854 12.5028C24.2651 11.5406 24.3122 9.97722 23.3923 8.95779L22.3171 7.76644C21.6823 7.06292 20.7248 7.10193 20.1161 7.27222C19.9737 7.31205 19.8228 7.33358 19.6657 7.33358C18.7452 7.33358 17.999 6.58739 17.999 5.66691C17.999 5.44944 18.0403 5.24342 18.1147 5.05496C18.3473 4.46631 18.4835 3.51831 17.8488 2.81506L16.5845 1.41408Z"
                        fill="#FFA500"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      <p className="text-2xl">
                        আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                      </p>
                      <div className="bg-[#FFA500]/30 px-6 py-[2px] rounded-full">
                        Pending
                      </div>
                    </div>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      21 নভেম্বর 2022, বিকেল ৫:৪৫
                    </p>
                  </div>
                </div>
              </div>
              <div className="collapse-content   border-t border-gray-400/50 dark:border-gray-300/20 ">
                <div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>Admin</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>You</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="w-[60px]"></div>
                    <div className="mt-6 w-full  px-4 py-2  rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5">
                      <textarea
                        placeholder="Enter Your Response"
                        className=" bg-none w-full bg-opacity-0 bg-transparent
                      outline-none text-heading dark:text-darkHeading 
                    "
                      ></textarea>
                      <div className="flex justify-end">
                        <button>
                          <svg
                            width="56"
                            height="40"
                            viewBox="0 0 56 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_d_4295_1440)">
                              <rect
                                x="2.5918"
                                y="1"
                                width="50.9091"
                                height="36"
                                rx="12"
                                fill="#57A68F"
                              />
                              <rect
                                x="3.0918"
                                y="1.5"
                                width="49.9091"
                                height="35"
                                rx="11.5"
                                stroke="#349176"
                              />
                              <path
                                d="M18.5918 11V17.1818L29.5009 19L18.5918 20.8182V27L37.5009 19L18.5918 11Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_d_4295_1440"
                                x="0.591797"
                                y="0"
                                width="54.9082"
                                height="40"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="1" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_4295_1440"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_4295_1440"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "text-heading dark:text-darkHeading collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mb-6"
              }
              key={Math.random()}
            >
              <input type="radio" name="my-accordion-3"  />
              <div className="collapse-title  font-medium ">
                <div className="flex gap-8 items-center">
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5845 1.41408C15.6019 0.325165 13.9074 0.281734 12.8702 1.31887L0.801353 13.3873C-0.227062 14.4157 -0.194416 16.0929 0.87324 17.0805L2.24843 18.3525C2.96234 19.0129 3.9403 18.8652 4.53865 18.622C4.73122 18.5437 4.94244 18.5002 5.16569 18.5002C6.08617 18.5002 6.83236 19.2464 6.83236 20.1669C6.83236 20.3442 6.80494 20.5136 6.75465 20.672C6.55939 21.287 6.48778 22.2739 7.20193 22.9345L8.2216 23.8777C9.22545 24.8063 10.7815 24.783 11.7572 23.8248L23.2854 12.5028C24.2651 11.5406 24.3122 9.97722 23.3923 8.95779L22.3171 7.76644C21.6823 7.06292 20.7248 7.10193 20.1161 7.27222C19.9737 7.31205 19.8228 7.33358 19.6657 7.33358C18.7452 7.33358 17.999 6.58739 17.999 5.66691C17.999 5.44944 18.0403 5.24342 18.1147 5.05496C18.3473 4.46631 18.4835 3.51831 17.8488 2.81506L16.5845 1.41408Z"
                        fill="#FFA500"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      <p className="text-2xl">
                        আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                      </p>
                      <div className="bg-[#FFA500]/30 px-6 py-[2px] rounded-full">
                        Pending
                      </div>
                    </div>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      21 নভেম্বর 2022, বিকেল ৫:৪৫
                    </p>
                  </div>
                </div>
              </div>
              <div className="collapse-content   border-t border-gray-400/50 dark:border-gray-300/20 ">
                <div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>Admin</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>You</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="w-[60px]"></div>
                    <div className="mt-6 w-full  px-4 py-2  rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5">
                      <textarea
                        placeholder="Enter Your Response"
                        className=" bg-none w-full bg-opacity-0 bg-transparent
                      outline-none text-heading dark:text-darkHeading 
                    "
                      ></textarea>
                      <div className="flex justify-end">
                        <button>
                          <svg
                            width="56"
                            height="40"
                            viewBox="0 0 56 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_d_4295_1440)">
                              <rect
                                x="2.5918"
                                y="1"
                                width="50.9091"
                                height="36"
                                rx="12"
                                fill="#57A68F"
                              />
                              <rect
                                x="3.0918"
                                y="1.5"
                                width="49.9091"
                                height="35"
                                rx="11.5"
                                stroke="#349176"
                              />
                              <path
                                d="M18.5918 11V17.1818L29.5009 19L18.5918 20.8182V27L37.5009 19L18.5918 11Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_d_4295_1440"
                                x="0.591797"
                                y="0"
                                width="54.9082"
                                height="40"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="1" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_4295_1440"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_4295_1440"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                "text-heading dark:text-darkHeading collapse collapse-plus dark:bg-gray-200/5 bg-gray-400/20 border-gray-400/50 backdrop-blur-lg border dark:border-gray-200/20 mb-6"
              }
              key={Math.random()}
            >
              <input type="radio" name="my-accordion-3"  />
              <div className="collapse-title  font-medium ">
                <div className="flex gap-8 items-center">
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5845 1.41408C15.6019 0.325165 13.9074 0.281734 12.8702 1.31887L0.801353 13.3873C-0.227062 14.4157 -0.194416 16.0929 0.87324 17.0805L2.24843 18.3525C2.96234 19.0129 3.9403 18.8652 4.53865 18.622C4.73122 18.5437 4.94244 18.5002 5.16569 18.5002C6.08617 18.5002 6.83236 19.2464 6.83236 20.1669C6.83236 20.3442 6.80494 20.5136 6.75465 20.672C6.55939 21.287 6.48778 22.2739 7.20193 22.9345L8.2216 23.8777C9.22545 24.8063 10.7815 24.783 11.7572 23.8248L23.2854 12.5028C24.2651 11.5406 24.3122 9.97722 23.3923 8.95779L22.3171 7.76644C21.6823 7.06292 20.7248 7.10193 20.1161 7.27222C19.9737 7.31205 19.8228 7.33358 19.6657 7.33358C18.7452 7.33358 17.999 6.58739 17.999 5.66691C17.999 5.44944 18.0403 5.24342 18.1147 5.05496C18.3473 4.46631 18.4835 3.51831 17.8488 2.81506L16.5845 1.41408Z"
                        fill="#FFA500"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex gap-4 items-center">
                      <p className="text-2xl">
                        আমি আমার আনুগত্য পয়েন্ট খুঁজে পাচ্ছি না
                      </p>
                      <div className="bg-[#FFA500]/30 px-6 py-[2px] rounded-full">
                        Pending
                      </div>
                    </div>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      হ্যালো! আমি এই সমস্যার সম্মুখীন হচ্ছি যেখানে আমি আমার
                      আনুগত্য পয়েন্ট দাবি করতে পারি না। পয়েন্ট দেখাচ্ছে কিন্তু
                      আমি এটা দাবি করতে পারি না। সমস্যাটি আমাকে সাহায্য করুন.
                      এটা হতাশাজনক
                    </p>
                    <p className="text-sm text-paragraph dark:text-darkParagraph mt-2">
                      21 নভেম্বর 2022, বিকেল ৫:৪৫
                    </p>
                  </div>
                </div>
              </div>
              <div className="collapse-content   border-t border-gray-400/50 dark:border-gray-300/20 ">
                <div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>Admin</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex">
                      <div className="w-[60px]"></div>

                      <div className="border-b border-gray-300/20 w-full pb-5">
                        <div className="flex gap-2 items-center">
                          <img
                            src="/teacherprofile.png"
                            className="w-16  h-16 rounded-full"
                            alt=""
                          />
                          <div className="">
                            <div className="flex items-center gap-[3px]">
                              <p className="text-xl font-semibold">
                                {" "}
                                Muhid Hasan
                              </p>
                              <svg
                                width="5"
                                height="4"
                                viewBox="0 0 5 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="2.5" cy="2" r="2" fill="#D9D9D9" />
                              </svg>
                              <p>You</p>
                            </div>
                            <p className="text-paragraph dark:text-darkParagraph">
                              22 নভেম্বর 2022, বিকেল ৫:৪৫
                            </p>
                          </div>
                        </div>
                        <div>Hello wrold</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="w-[60px]"></div>
                    <div className="mt-6 w-full  px-4 py-2  rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5">
                      <textarea
                        placeholder="Enter Your Response"
                        className=" bg-none w-full bg-opacity-0 bg-transparent
                      outline-none text-heading dark:text-darkHeading 
                    "
                      ></textarea>
                      <div className="flex justify-end">
                        <button>
                          <svg
                            width="56"
                            height="40"
                            viewBox="0 0 56 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g filter="url(#filter0_d_4295_1440)">
                              <rect
                                x="2.5918"
                                y="1"
                                width="50.9091"
                                height="36"
                                rx="12"
                                fill="#57A68F"
                              />
                              <rect
                                x="3.0918"
                                y="1.5"
                                width="49.9091"
                                height="35"
                                rx="11.5"
                                stroke="#349176"
                              />
                              <path
                                d="M18.5918 11V17.1818L29.5009 19L18.5918 20.8182V27L37.5009 19L18.5918 11Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_d_4295_1440"
                                x="0.591797"
                                y="0"
                                width="54.9082"
                                height="40"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="1" />
                                <feGaussianBlur stdDeviation="1" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_4295_1440"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_4295_1440"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </button>
                      </div>
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
