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

export default function ProfilePage({}: Props) {
  const [user, setUser] = useContext<any>(UserContext);
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
          <div className="z-20 mx-auto min-h-[80vh] w-[90%] py-12 lgXl:w-[80%]">
            <div className="flex flex-col lg:flex-row w-[full] justify-between gap-20">
              <div className="rounded-xl flex-[1] border py-16 px-8 border-[#2BA98B]/50 bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
                <div className="flex flex-col items-center">
                  <img src="/profile_image.png" alt="" />
                  <div className="mt-8 mb-12 flex flex-col items-center w-full">
                    <div className="bg-[#DFDBDB]/10 w-full h-4 rounded-full">
                      <div className="bg-[#2BA98B] w-[15%] h-4 rounded-full"></div>
                    </div>
                    <p className="mt-3 text-paragraph dark:text-darkParagraph">
                      45% Completed
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/profile"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.196 19.9905C5.48476 19.0294 6.07563 18.187 6.88095 17.5883C7.68628 16.9896 8.66315 16.6664 9.66667 16.6667H14.3333C15.3381 16.6663 16.3162 16.9903 17.1221 17.5904C17.928 18.1905 18.5187 19.0347 18.8063 19.9975M1.5 12C1.5 13.3789 1.77159 14.7443 2.29926 16.0182C2.82694 17.2921 3.60036 18.4496 4.57538 19.4246C5.55039 20.3996 6.70791 21.1731 7.98182 21.7007C9.25574 22.2284 10.6211 22.5 12 22.5C13.3789 22.5 14.7443 22.2284 16.0182 21.7007C17.2921 21.1731 18.4496 20.3996 19.4246 19.4246C20.3996 18.4496 21.1731 17.2921 21.7007 16.0182C22.2284 14.7443 22.5 13.3789 22.5 12C22.5 10.6211 22.2284 9.25574 21.7007 7.98182C21.1731 6.70791 20.3996 5.55039 19.4246 4.57538C18.4496 3.60036 17.2921 2.82694 16.0182 2.29927C14.7443 1.77159 13.3789 1.5 12 1.5C10.6211 1.5 9.25574 1.77159 7.98182 2.29927C6.70791 2.82694 5.55039 3.60036 4.57538 4.57538C3.60036 5.55039 2.82694 6.70791 2.29926 7.98182C1.77159 9.25574 1.5 10.6211 1.5 12ZM8.5 9.66667C8.5 10.5949 8.86875 11.4852 9.52513 12.1415C10.1815 12.7979 11.0717 13.1667 12 13.1667C12.9283 13.1667 13.8185 12.7979 14.4749 12.1415C15.1313 11.4852 15.5 10.5949 15.5 9.66667C15.5 8.73841 15.1313 7.84817 14.4749 7.19179C13.8185 6.53542 12.9283 6.16667 12 6.16667C11.0717 6.16667 10.1815 6.53542 9.52513 7.19179C8.86875 7.84817 8.5 8.73841 8.5 9.66667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      My Profile
                    </p>
                  </Link>

                  <Link
                    href="/profile/social"
                    className="flex items-center gap-4 px-4 py-3  border rounded-xl border-[#2BA98B]/20  backdrop-blur-lg bg-[#2BA98B]/5 "
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49949 14.4997L14.4995 7.4997M9.83282 3.99971L10.373 3.37437C11.4671 2.28042 12.951 1.66591 14.4982 1.66602C16.0453 1.66613 17.5291 2.28085 18.6231 3.37496C19.717 4.46906 20.3315 5.95293 20.3314 7.50012C20.3313 9.04731 19.7166 10.5311 18.6225 11.625L17.9995 12.1664M12.1662 17.9997L11.703 18.6227C10.5961 19.7173 9.10227 20.3311 7.5456 20.3311C5.98893 20.3311 4.49506 19.7173 3.38818 18.6227C2.8426 18.0832 2.40946 17.4409 2.11384 16.7329C1.81823 16.0248 1.66602 15.2652 1.66602 14.498C1.66602 13.7307 1.81823 12.9711 2.11384 12.263C2.40946 11.555 2.8426 10.9127 3.38818 10.3732L3.99951 9.83304"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-heading dark:text-darkHeading font-semibold  text-xl ">
                      Social Links
                    </p>
                  </Link>
                  <Link
                    href="/profile/address"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]"
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 18.5837L8.5 16.8337M8.5 16.8337L1.5 20.3337V5.16699L8.5 1.66699M8.5 16.8337V1.66699M8.5 1.66699L15.5 5.16699M15.5 5.16699L22.5 1.66699V10.417M15.5 5.16699V11.5837M20.1667 18.0003V18.012M22.6412 20.4748C23.1308 19.9854 23.4642 19.3617 23.5993 18.6828C23.7345 18.0038 23.6652 17.3 23.4003 16.6604C23.1355 16.0208 22.6869 15.4741 22.1113 15.0895C21.5357 14.7049 20.8589 14.4996 20.1667 14.4996C19.4744 14.4996 18.7977 14.7049 18.2221 15.0895C17.6465 15.4741 17.1979 16.0208 16.933 16.6604C16.6681 17.3 16.5989 18.0038 16.734 18.6828C16.8691 19.3617 17.2026 19.9854 17.6922 20.4748C18.1798 20.9637 19.0047 21.694 20.1667 22.667C21.3928 21.6287 22.2188 20.8983 22.6412 20.4748Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Gift Address
                    </p>
                  </Link>
                  <Link
                    href=""
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.196 19.9905C5.48476 19.0294 6.07563 18.187 6.88095 17.5883C7.68628 16.9896 8.66315 16.6664 9.66667 16.6667H14.3333C15.3381 16.6663 16.3162 16.9903 17.1221 17.5904C17.928 18.1905 18.5187 19.0347 18.8063 19.9975M1.5 12C1.5 13.3789 1.77159 14.7443 2.29926 16.0182C2.82694 17.2921 3.60036 18.4496 4.57538 19.4246C5.55039 20.3996 6.70791 21.1731 7.98182 21.7007C9.25574 22.2284 10.6211 22.5 12 22.5C13.3789 22.5 14.7443 22.2284 16.0182 21.7007C17.2921 21.1731 18.4496 20.3996 19.4246 19.4246C20.3996 18.4496 21.1731 17.2921 21.7007 16.0182C22.2284 14.7443 22.5 13.3789 22.5 12C22.5 10.6211 22.2284 9.25574 21.7007 7.98182C21.1731 6.70791 20.3996 5.55039 19.4246 4.57538C18.4496 3.60036 17.2921 2.82694 16.0182 2.29927C14.7443 1.77159 13.3789 1.5 12 1.5C10.6211 1.5 9.25574 1.77159 7.98182 2.29927C6.70791 2.82694 5.55039 3.60036 4.57538 4.57538C3.60036 5.55039 2.82694 6.70791 2.29926 7.98182C1.77159 9.25574 1.5 10.6211 1.5 12ZM8.5 9.66667C8.5 10.5949 8.86875 11.4852 9.52513 12.1415C10.1815 12.7979 11.0717 13.1667 12 13.1667C12.9283 13.1667 13.8185 12.7979 14.4749 12.1415C15.1313 11.4852 15.5 10.5949 15.5 9.66667C15.5 8.73841 15.1313 7.84817 14.4749 7.19179C13.8185 6.53542 12.9283 6.16667 12 6.16667C11.0717 6.16667 10.1815 6.53542 9.52513 7.19179C8.86875 7.84817 8.5 8.73841 8.5 9.66667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Education Details
                    </p>
                  </Link>
                  <Link
                    href=""
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]"
                  >
                    <svg
                      width="20"
                      height="24"
                      viewBox="0 0 20 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.334 1.5V6.16667C12.334 6.47609 12.4569 6.77283 12.6757 6.99162C12.8945 7.21042 13.1912 7.33333 13.5007 7.33333H18.1673M12.334 1.5H4.16732C3.54848 1.5 2.95499 1.74583 2.5174 2.18342C2.07982 2.621 1.83398 3.21449 1.83398 3.83333V20.1667C1.83398 20.7855 2.07982 21.379 2.5174 21.8166C2.95499 22.2542 3.54848 22.5 4.16732 22.5H15.834C16.4528 22.5 17.0463 22.2542 17.4839 21.8166C17.9215 21.379 18.1673 20.7855 18.1673 20.1667V7.33333M12.334 1.5L18.1673 7.33333M6.50065 17.8333H13.5007M6.50065 13.1667H13.5007"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      My Experience
                    </p>
                  </Link>
                  <Link
                    href=""
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:border-[#2BA98B]/20 cursor-pointer duration-200  ease-in-out    hover:bg-[#6bbba81a]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 12H2.66667M12 1.5V2.66667M21.3333 12H22.5M4.53333 4.53333L5.35 5.35M19.4667 4.53333L18.65 5.35M9.31666 17.8333H14.6833M8.5 16.6667C7.52055 15.9321 6.79706 14.9079 6.432 13.7393C6.06695 12.5707 6.07885 11.3168 6.46601 10.1553C6.85318 8.99385 7.59597 7.98362 8.58919 7.26775C9.58241 6.55188 10.7757 6.16667 12 6.16667C13.2243 6.16667 14.4176 6.55188 15.4108 7.26775C16.404 7.98362 17.1468 8.99385 17.534 10.1553C17.9211 11.3168 17.933 12.5707 17.568 13.7393C17.2029 14.9079 16.4795 15.9321 15.5 16.6667C15.0445 17.1176 14.7015 17.6694 14.4988 18.2774C14.2962 18.8854 14.2395 19.5326 14.3333 20.1667C14.3333 20.7855 14.0875 21.379 13.6499 21.8166C13.2123 22.2542 12.6188 22.5 12 22.5C11.3812 22.5 10.7877 22.2542 10.3501 21.8166C9.9125 21.379 9.66667 20.7855 9.66667 20.1667C9.76053 19.5326 9.70383 18.8854 9.50115 18.2774C9.29847 17.6694 8.9555 17.1176 8.5 16.6667Z"
                        className="stroke-black dark:stroke-white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="text-paragraph dark:text-darkParagraph text-xl ">
                      Skill Set
                    </p>
                  </Link>
                </div>
              </div>
              <div className="rounded-xl w-full flex-[3] border py-16 px-8 border-[#2BA98B]/50 bg-gray-400/20 backdrop-blur-lg dark:bg-gray-200/5 ">
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
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
