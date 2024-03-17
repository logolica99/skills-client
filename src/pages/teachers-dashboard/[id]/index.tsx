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

export default function RewardPage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
  const [isOverview, setIsOverview] = useState<boolean>(true);
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

        <div className="overflow-x-hidden bg-white py-16 dark:bg-[#0E0E0E]">
          <div className="z-20 mx-auto  w-[90%] pt-12 ">
            <div className="flex  flex-col lg:flex-row gap justify-between items-center">
              <div className="flex gap-6 items-center">
                <img
                  className="w-20 h-20 lg:w-40 lg:h-40 rounded-full"
                  src="/teacherprofile.png"
                  alt=""
                />

                <div>
                  <p className="text-heading dark:text-darkHeading  text-3xl  font-bold">
                    Muhidul Hasan
                  </p>
                  <p>Coding Guru ninja & best Coder</p>
                </div>
              </div>
              <div>
                <button className="my-4 lg:my-0 rounded-lg font-semibold bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  py-2 px-8 border border-gray-300/20 hover:border-gray-300 text-heading dark:text-darkHeading">
                  View Courses
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-300/20 h-[1px] my-2"></div>
          <div className="z-20 mx-auto  w-[90%] mt-4">
            <div className="flex flex-col lg:flex-row justify-between lg:gap-20 ">
              <div className="flex-[2]">
                <div className="flex gap-4 text-lg">
                  <div
                    onClick={() => {
                      setIsOverview(true);
                    }}
                    className={`font-semibold cursor-pointer  ${isOverview ? "text-heading dark:text-darkHeading border-b-2 " : "text-paragraph dark:text-darkParagraph"}`}
                  >
                    Overview
                  </div>
                  <div
                    onClick={() => {
                      setIsOverview(false);
                    }}
                    className={`font-semibold  cursor-pointer ${!isOverview ? "text-heading dark:text-darkHeading border-b-2 " : "text-paragraph dark:text-darkParagraph"}`}
                  >
                    Recommendation
                  </div>
                </div>
                {isOverview ? (
                  <div className="my-4 ">
                    <p className="text-heading dark:text-darkHeading">
                      Im a Product Designer based in Melbourne, Australia. I
                      enjoy working on product design, design systems, and
                      Webflow projects, but I dont take myself too seriously.
                      <br />
                      Ive worked with some of the worlds most exciting
                      companies, including Coinbase, Stripe, and Linear. Im
                      passionate about helping startups grow, improve their UX
                      and customer experience, and to raise venture capital
                      through good design.
                      <br />
                      My work has been featured on Typewolf, Mindsparkle
                      Magazine, Webflow, Fonts In Use, CSS Winner, httpster,
                      Siteinspire, and Best Website Gallery.
                    </p>
                  </div>
                ) : (
                  <div className="my-4">
                    <div className="h-[40vh] overflow-y-scroll scrollbar-hide">
                      <div className=" mb-4 rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="/teacherprofile.png"
                            alt=""
                          />
                          <div>
                            <p className="text-lg font-semibold">
                              Muhidul Hasan
                            </p>
                            <p className="text-sm mt-[2px]">HSC STUDENT</p>
                          </div>
                        </div>
                        <p>
                          “ Im a Product Designer based in Melbourne,
                          Australia. I enjoy working on product design, design
                          systems, and Webflow projects, but I dont take myself
                          too seriously ”
                        </p>
                      </div>
                      <div className=" mb-4 rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="/teacherprofile.png"
                            alt=""
                          />
                          <div>
                            <p className="text-lg font-semibold">
                              Muhidul Hasan
                            </p>
                            <p className="text-sm mt-[2px]">HSC STUDENT</p>
                          </div>
                        </div>
                        <p>
                          “ Im a Product Designer based in Melbourne,
                          Australia. I enjoy working on product design, design
                          systems, and Webflow projects, but I dont take myself
                          too seriously ”
                        </p>
                      </div>
                      <div className=" mb-4 rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="/teacherprofile.png"
                            alt=""
                          />
                          <div>
                            <p className="text-lg font-semibold">
                              Muhidul Hasan
                            </p>
                            <p className="text-sm mt-[2px]">HSC STUDENT</p>
                          </div>
                        </div>
                        <p>
                          “ Im a Product Designer based in Melbourne,
                          Australia. I enjoy working on product design, design
                          systems, and Webflow projects, but I dont take myself
                          too seriously ”
                        </p>
                      </div>
                      <div className=" mb-4 rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="/teacherprofile.png"
                            alt=""
                          />
                          <div>
                            <p className="text-lg font-semibold">
                              Muhidul Hasan
                            </p>
                            <p className="text-sm mt-[2px]">HSC STUDENT</p>
                          </div>
                        </div>
                        <p>
                          “ Im a Product Designer based in Melbourne,
                          Australia. I enjoy working on product design, design
                          systems, and Webflow projects, but I dont take myself
                          too seriously ”
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-[1]">
                <p className="font-bold text-heading dark:text-darkHeading">
                  Expertise
                </p>
                <div className="flex flex-wrap mt-2 gap-4">
                  <div className="rounded-md font-semibold bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  py-1 px-4 border border-gray-300/20  text-heading dark:text-darkHeading">
                    C++
                  </div>
                  <div className="rounded-md font-semibold bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  py-1 px-4 border border-gray-300/20  text-heading dark:text-darkHeading">
                    Php
                  </div>
                  <div className="rounded-md font-semibold bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5  py-1 px-4 border border-gray-300/20  text-heading dark:text-darkHeading">
                    Javascript
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-300/20 h-[1px] my-2"></div>
            <p className="font-bold text-heading dark:text-darkHeading">
              Socials
            </p>
            <div className="flex gap-4 mt-1">
              <a href="" target="_blank">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_3217_950)">
                    <rect
                      x="2"
                      y="1"
                      width="24"
                      height="24"
                      rx="12"
                      fill="#57A68F"
                      fill-opacity="0.24"
                      shape-rendering="crispEdges"
                    />
                    <path
                      d="M20.6654 13.0007C20.6654 9.32065 17.6787 6.33398 13.9987 6.33398C10.3187 6.33398 7.33203 9.32065 7.33203 13.0007C7.33203 16.2273 9.62536 18.914 12.6654 19.534V15.0007H11.332V13.0007H12.6654V11.334C12.6654 10.0473 13.712 9.00065 14.9987 9.00065H16.6654V11.0007H15.332C14.9654 11.0007 14.6654 11.3007 14.6654 11.6673V13.0007H16.6654V15.0007H14.6654V19.634C18.032 19.3007 20.6654 16.4607 20.6654 13.0007Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_3217_950"
                      x="0"
                      y="0"
                      width="28"
                      height="28"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                        result="effect1_dropShadow_3217_950"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3217_950"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_3217_953)">
                    <rect
                      x="2"
                      y="1"
                      width="24"
                      height="24"
                      rx="12"
                      fill="#57A68F"
                      fill-opacity="0.24"
                      shape-rendering="crispEdges"
                    />
                    <path
                      d="M19.4444 6C19.857 6 20.2527 6.16389 20.5444 6.45561C20.8361 6.74733 21 7.143 21 7.55556V18.4444C21 18.857 20.8361 19.2527 20.5444 19.5444C20.2527 19.8361 19.857 20 19.4444 20H8.55556C8.143 20 7.74733 19.8361 7.45561 19.5444C7.16389 19.2527 7 18.857 7 18.4444V7.55556C7 7.143 7.16389 6.74733 7.45561 6.45561C7.74733 6.16389 8.143 6 8.55556 6H19.4444ZM19.0556 18.0556V13.9333C19.0556 13.2609 18.7884 12.6159 18.3129 12.1404C17.8374 11.6649 17.1925 11.3978 16.52 11.3978C15.8589 11.3978 15.0889 11.8022 14.7156 12.4089V11.5456H12.5456V18.0556H14.7156V14.2211C14.7156 13.6222 15.1978 13.1322 15.7967 13.1322C16.0855 13.1322 16.3624 13.2469 16.5666 13.4512C16.7708 13.6554 16.8856 13.9323 16.8856 14.2211V18.0556H19.0556ZM10.0178 10.3244C10.3643 10.3244 10.6967 10.1868 10.9417 9.94173C11.1868 9.69668 11.3244 9.36433 11.3244 9.01778C11.3244 8.29444 10.7411 7.70333 10.0178 7.70333C9.66917 7.70333 9.33483 7.84182 9.08833 8.08833C8.84182 8.33483 8.70333 8.66917 8.70333 9.01778C8.70333 9.74111 9.29444 10.3244 10.0178 10.3244ZM11.0989 18.0556V11.5456H8.94444V18.0556H11.0989Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_3217_953"
                      x="0"
                      y="0"
                      width="28"
                      height="28"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                        result="effect1_dropShadow_3217_953"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3217_953"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </a>
              <a href="" target="_blank">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_4281_1439)">
                    <rect
                      x="2"
                      y="1"
                      width="24"
                      height="24"
                      rx="12"
                      fill="#57A68F"
                      fill-opacity="0.24"
                      shape-rendering="crispEdges"
                    />
                  </g>
                  <path
                    d="M14 3C11.6255 3.0001 9.32849 3.84511 7.51999 5.38385C5.71149 6.92258 4.50953 9.05462 4.12916 11.3985C3.74879 13.7423 4.21485 16.1451 5.44393 18.1768C6.67301 20.2084 8.58491 21.7365 10.8375 22.4875C11.3375 22.575 11.525 22.275 11.525 22.0125C11.525 21.775 11.5125 20.9875 11.5125 20.15C9.00003 20.6125 8.35003 19.5375 8.15003 18.975C7.9281 18.428 7.5763 17.9431 7.12503 17.5625C6.77503 17.375 6.27503 16.9125 7.11252 16.9C7.4323 16.9347 7.73901 17.046 8.00666 17.2244C8.2743 17.4028 8.49499 17.6432 8.65003 17.925C8.7868 18.1707 8.97071 18.387 9.19122 18.5615C9.41173 18.736 9.6645 18.8653 9.93506 18.9419C10.2056 19.0185 10.4886 19.041 10.7679 19.0081C11.0472 18.9752 11.3172 18.8875 11.5625 18.75C11.6058 18.2416 11.8324 17.7663 12.2 17.4125C9.97503 17.1625 7.65003 16.3 7.65003 12.475C7.63597 11.4812 8.00271 10.5196 8.67503 9.78753C8.36931 8.92375 8.40508 7.97581 8.77503 7.13753C8.77503 7.13753 9.6125 6.87502 11.525 8.16253C13.1613 7.7125 14.8887 7.7125 16.525 8.16253C18.4375 6.86253 19.275 7.13753 19.275 7.13753C19.645 7.9758 19.6808 8.92376 19.375 9.78753C20.0494 10.5184 20.4164 11.4808 20.4 12.475C20.4 16.3125 18.0625 17.1625 15.8375 17.4125C16.0762 17.6544 16.26 17.9448 16.3764 18.264C16.4929 18.5833 16.5393 18.9238 16.5125 19.2625C16.5125 20.6 16.5 21.675 16.5 22.0125C16.5 22.275 16.6875 22.5875 17.1875 22.4875C19.4362 21.7304 21.3426 20.1988 22.5664 18.166C23.7903 16.1333 24.2519 13.7318 23.8689 11.3902C23.4859 9.04864 22.2832 6.91937 20.4755 5.38251C18.6678 3.84565 16.3727 3.00123 14 3Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_d_4281_1439"
                      x="0"
                      y="0"
                      width="28"
                      height="28"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
                        result="effect1_dropShadow_4281_1439"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_4281_1439"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          <div className="z-20 mx-auto  w-[95%] mt-6">
            <p className="text-lg font-bold text-heading dark:text-darkHeading mb-4">
              Courses
            </p>

            <div className="flex flex-wrap  justify-center lg:justify-start gap-6 items-center">
              <div className="border cursor-pointer border-[#2BA98B] rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                <img
                  src="/Frame 1000004325 1.png"
                  alt=""
                  className="rounded-lg"
                />
                <p>Web Development শিখব এবার হাতে কলমে</p>
                <div className="flex  gap-1 items-center mt-2">
                  <p className="font-bold text-xl ">৳750</p>
                  <p className="line-through">৳1050</p>
                </div>
              </div>
              <div className="border cursor-pointer border-[#2BA98B] rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                <img
                  src="/Frame 1000004325 1.png"
                  alt=""
                  className="rounded-lg"
                />
                <p>Web Development শিখব এবার হাতে কলমে</p>
                <div className="flex  gap-1 items-center mt-2">
                  <p className="font-bold text-xl ">৳750</p>
                  <p className="line-through">৳1050</p>
                </div>
              </div>
              <div className="border cursor-pointer border-[#2BA98B] rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                <img
                  src="/Frame 1000004325 1.png"
                  alt=""
                  className="rounded-lg"
                />
                <p>Web Development শিখব এবার হাতে কলমে</p>
                <div className="flex  gap-1 items-center mt-2">
                  <p className="font-bold text-xl ">৳750</p>
                  <p className="line-through">৳1050</p>
                </div>
              </div>
              <div className="border cursor-pointer border-[#2BA98B] rounded-lg bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 p-2  hover:border-gray-300 text-heading dark:text-darkHeading">
                <img
                  src="/Frame 1000004325 1.png"
                  alt=""
                  className="rounded-lg"
                />
                <p>Web Development শিখব এবার হাতে কলমে</p>
                <div className="flex  gap-1 items-center mt-2">
                  <p className="font-bold text-xl ">৳750</p>
                  <p className="line-through">৳1050</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
